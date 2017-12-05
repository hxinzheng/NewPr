<?php
namespace app\common;
use EasyWeChat\Foundation\Application;
use yii\web\Controller;
use Yii;

/**
 * Public abstract controller
 */
class BaseController extends Controller{

    static $app;
    public function getWechatApp(){
        if(!self::$app) {
            self::$app = new Application(Yii::app()->params['wechat']);
        }
        return self::$app;
    }
}