import { HttpHeaders, HttpParams } from "@angular/common/http";
/*
    接口命名规范: 首字母大写
*/
interface ReqInterface {
    url: string;
    param?: HttpParams | undefined;
    httpHeader?: HttpHeaders;
}


/**
 * 将get、post请求所需的所有常用参数收集到一起来处理
 *
 * @interface ReqAPIOptionsInterface
 */
interface ReqAPIOptionsInterface {
    param?: any;
    body?: any;
    httpHeader?: HttpHeaders | undefined;
}

/**
 * assets/environment/environment.json中指定请求节点的内容定义！
 *
 * @interface ReqContentInterface
 */
interface ReqContentInterface {
    type: string;
    des: string;
    url: string;
}



export {
    ReqInterface,
    ReqAPIOptionsInterface,
    ReqContentInterface
}