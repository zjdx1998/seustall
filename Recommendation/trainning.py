# @author: 71117123
# @CreateTime: 2019/9/8
# @LastUpdate: 2019/9/10
from zoo.models.recommendation import *
from zoo.models.recommendation.utils import *
from zoo.common.nncontext import init_nncontext

# export PYTHONIOENCODING=utf-8
# JumpMachine: export LC_ALL=zh_CN.UTF-8

from random import *
import os
import sys
import datetime as dt

# import matplotlib
# matplotlib.use('agg')
# import matplotlib.pyplot as plt

sc = init_nncontext("FoofRecommendation")
sqlContext = SQLContext(sc)
import pyspark.sql.functions as F
favor = sqlContext.read.format("jdbc").options(url="jdbc:mysql://localhost:3306/foof?user=app&password=foof",dbtable="favourites").load()
users = sqlContext.read.format("jdbc").options(url="jdbc:mysql://localhost:3306/foof?user=app&password=foof",dbtable="users").load()
items = sqlContext.read.format("jdbc").options(url="jdbc:mysql://localhost:3306/foof?user=app&password=foof",dbtable="items").load()
favor = favor.drop('id')
rating = favor.rdd.map(lambda x: (x[0], x[1], randint(1, 3))).\
    toDF(['itemId', 'userId', 'label'])
#print()
rating = users.join(rating, rating.userId==users.uuid).drop('info','password','uuid','username','phonenumber','avatarurl').dropna()
add_udf = F.udf(lambda x: categorical_from_vocab_list(x, ["M","T","J","S","D"],start=1))
grade_udf = F.udf(lambda x: 21320-int(x)/10000)
bucket_cross_udf = F.udf(lambda feature1, feature2: hash_bucket(str(feature1) + "_" + str(feature2), bucket_size=100))
allDF = rating.withColumn("address", add_udf(F.col("address")).cast("int")).\
    withColumn("idcard",grade_udf(F.col("idcard")).cast("int")).\
        withColumnRenamed("idcard", "old").withColumnRenamed("studentid","master").\
            withColumn("old-add", bucket_cross_udf(F.col("old"),F.col("address")).cast("int"))
allDF.show()
max_user_id = allDF.agg({"userId":"max"}).collect()
max_item_id = allDF.agg({"itemId":"max"}).collect()
bucket_size = 100
max_user_id = max_user_id[0][0] + 1
max_item_id = max_item_id[0][0] + 1

column_info = ColumnFeatureInfo(
    wide_base_cols=["master", "address"],
    wide_base_dims=[72, 6],
    wide_cross_cols=["old-add"],
    wide_cross_dims=[bucket_size],
    indicator_cols=["verified", "address"],
    indicator_dims=[2, 6],
    embed_cols=["userId", "itemId"],
    embed_in_dims=[max_user_id, max_item_id],
    embed_out_dims=[64, 64],
    continuous_cols=["score"]
)

rdds = allDF.rdd\
.map(lambda row: to_user_item_feature(row, column_info))\
.repartition(4)
trainPairFeatureRdds, valPairFeatureRdds = rdds.randomSplit([0.9, 0.1], seed= 1)
valPairFeatureRdds.persist()
train_data= trainPairFeatureRdds.map(lambda pair_feature: pair_feature.sample)
test_data= valPairFeatureRdds.map(lambda pair_feature: pair_feature.sample)

wide_n_deep = WideAndDeep(4, column_info, "wide_n_deep")


wide_n_deep.compile(optimizer = "adam",
                    loss= "sparse_categorical_crossentropy",
                    metrics=['accuracy'])


#%%time
# Boot training process
wide_n_deep.fit(train_data,
                batch_size = 8000,
                nb_epoch = 10,
                validation_data = test_data)
print("Optimization Done.")

