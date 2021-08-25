import * as secret from "./secret"
// @ponicode
describe("secret.Decrypt", () => {
    test("0", () => {
        let callFunction: any = () => {
            secret.Decrypt("eveniet")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            secret.Decrypt("natus")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            secret.Decrypt("et")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            secret.Decrypt("voluptas")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            secret.Decrypt("ea")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            secret.Decrypt("")
        }
    
        expect(callFunction).not.toThrow()
    })
})
