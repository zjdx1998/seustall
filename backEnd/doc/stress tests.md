# **Stress tests** with Apache Bench


> * recorder: Hanyuu Furude
> * date: 2019/09/09
> * Apache Bench version: 2.3
> * Nginx version: 1.16.1
> * Nodejs version: v10.15.0
> * MySQL version: 8.0.12_win64
> * docker version
>   * Engine: 19.03.2
>   * Compose: 1.24.1
> * Windows version: windows 10_x64 pro build 18950
> * note
>   * n:指定测试会话使用的请求
>   * c:指定一次向服务器发出请求数

## statistic server

* n: 100000
* c: 1000
* response: Nginx
* description: performance of static page server
```
Server Software:        nginx/1.16.1
Server Hostname:        localhost
Server Port:            80

Document Path:          /
Document Length:        4290 bytes

Concurrency Level:      1000
Time taken for tests:   193.968 seconds
Complete requests:      100000
Failed requests:        0
Total transferred:      452500000 bytes
HTML transferred:       429000000 bytes
Requests per second:    515.55 [#/sec] (mean)
Time per request:       1939.679 [ms] (mean)
Time per request:       1.940 [ms] (mean, across all concurrent requests)
Transfer rate:          2278.18 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    2  28.1      0     503
Processing:    63 1909 201.3   1838    2405
Waiting:        1 1148 520.5   1182    1899
Total:         63 1911 202.6   1838    2405

Percentage of the requests served within a certain time (ms)
  50%   1838
  66%   1844
  75%   1856
  80%   1872
  90%   2333
  95%   2339
  98%   2347
  99%   2362
 100%   2405 (longest request)
```
## login

* n 100000
* c: 5000
* response: application server program
* description: user login

 ```
                                                                              
Server Software:                                                              
Server Hostname:        localhost                                             
Server Port:            4000                                                  
                                                                              
Document Path:          /user/login                                           
Document Length:        48 bytes                                              
                                                                              
Concurrency Level:      5000                                                  
Time taken for tests:   55.540 seconds                                        
Complete requests:      100000                                                
Failed requests:        0                                                     
Total transferred:      19000000 bytes                                        
Total body sent:        18700000                                              
HTML transferred:       4800000 bytes                                         
Requests per second:    1800.50 [#/sec] (mean)                                
Time per request:       2776.999 [ms] (mean)                                  
Time per request:       0.555 [ms] (mean, across all concurrent requests)     
Transfer rate:          334.08 [Kbytes/sec] received                          
                        328.80 kb/s sent                                      
                        662.88 kb/s total                                     
                                                                              
Connection Times (ms)                                                         
              min  mean[+/-sd] median   max                                   
Connect:        0    0  12.8      0     526                                   
Processing:   210 2613 741.3   2700    6055                                   
Waiting:       10 1770 785.4   1660    5975                                   
Total:        210 2613 741.5   2700    6055                                   
                                                                              
Percentage of the requests served within a certain time (ms)                  
  50%   2700                                                                  
  66%   2760                                                                  
  75%   3200                                                                  
  80%   3220                                                                  
  90%   3319                                                                  
  95%   3710                                                                  
  98%   4615                                                                  
  99%   5090                                                                  
 100%   6055 (longest request)                                                
 ```
## query public user

* n: 10000
* c: 9000
* response: application server program
* description: query user information

```
Server Software:
Server Hostname:        localhost
Server Port:            4000

Document Path:          /user/1
Document Length:        163 bytes

Concurrency Level:      9000
Time taken for tests:   8.209 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      3060000 bytes
HTML transferred:       1630000 bytes
Requests per second:    1218.10 [#/sec] (mean)
Time per request:       7388.531 [ms] (mean)
Time per request:       0.821 [ms] (mean, across all concurrent requests)
Transfer rate:          364.00 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    1  17.0      0     521
Processing:   445 4154 2215.0   4020    7580
Waiting:        0 3593 2239.3   3350    7300
Total:        445 4154 2215.0   4020    7580

Percentage of the requests served within a certain time (ms)
  50%   4020
  66%   5260
  75%   5875
  80%   6460
  90%   7065
  95%   7510
  98%   7550
  99%   7565
 100%   7580 (longest request)
```

## query item

* n: 100000

* c: 9000

* response: application server program

* description: query item

```
Server Software:
Server Hostname:        localhost
Server Port:            4000

Document Path:          /item/1
Document Length:        237 bytes

Concurrency Level:      9000
Time taken for tests:   45.279 seconds
Complete requests:      100000
Failed requests:        0
Total transferred:      38000000 bytes
HTML transferred:       23700000 bytes
Requests per second:    2208.51 [#/sec] (mean)
Time per request:       4075.153 [ms] (mean)
Time per request:       0.453 [ms] (mean, across all concurrent requests)
Transfer rate:          819.56 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   5.3      0     521
Processing:  2010 3663 660.1   3730    7070
Waiting:        0 3481 674.3   3611    6790
Total:       2010 3663 660.2   3730    7070

Percentage of the requests served within a certain time (ms)
  50%   3730
  66%   3760
  75%   3775
  80%   3785
  90%   3845
  95%   4195
  98%   6105
  99%   6600
 100%   7070 (longest request)
```

##  file image load

- n: 100000
- c: 9000
- response: Nginx
- description: resource file serve

```
Server Software:        nginx/1.16.1
Server Hostname:        localhost
Server Port:            80

Document Path:          /image/item/1-1-0.jpg
Document Length:        11242 bytes

Concurrency Level:      9000
Time taken for tests:   169.232 seconds
Complete requests:      100000
Failed requests:        0
Total transferred:      1147900000 bytes
HTML transferred:       1124200000 bytes
Requests per second:    590.91 [#/sec] (mean)
Time per request:       15230.841 [ms] (mean)
Time per request:       1.692 [ms] (mean, across all concurrent requests)
Transfer rate:          6624.04 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    1  25.9      0     531
Processing:   610 14258 2558.5  14650   17940
Waiting:        0 7405 4401.9   7255   17500
Total:        610 14260 2558.5  14650   17980

Percentage of the requests served within a certain time (ms)
  50%  14650
  66%  14940
  75%  15020
  80%  15055
  90%  15332
  95%  16490
  98%  17310
  99%  17515
 100%  17980 (longest request)
```

## message fetch

* n: 100000
* c: 9000
* response: application server program
* description: fetch message

```
Server Software:
Server Hostname:        localhost
Server Port:            4000

Document Path:          /user/chat/fetchnew
Document Length:        9 bytes

Concurrency Level:      9000
Time taken for tests:   188.531 seconds
Complete requests:      100000
Failed requests:        0
Non-2xx responses:      100000
Total transferred:      15100000 bytes
Total body sent:        32900000
HTML transferred:       900000 bytes
Requests per second:    530.42 [#/sec] (mean)
Time per request:       16967.759 [ms] (mean)
Time per request:       1.885 [ms] (mean, across all concurrent requests)
Transfer rate:          78.22 [Kbytes/sec] received
                        170.42 kb/s sent
                        248.63 kb/s total

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    2  28.8      0     525
Processing:   475 16182 2774.5  16785   18000
Waiting:        0 8682 4914.4   8550   17465
Total:        475 16184 2774.5  16785   18000

Percentage of the requests served within a certain time (ms)
  50%  16785
  66%  16850
  75%  17220
  80%  17261
  90%  17305
  95%  17450
  98%  17670
  99%  17805
 100%  18000 (longest request)
```

