<?php
namespace app\common;
use EasyWeChat\Foundation\Application;
use yii\web\Controller;
use Yii;

/**
 * Public abstract controller
 */
class BaseController extends Controller{

<<<<<<< HEAD
    static $app;
    
=======
    static $appr;
>>>>>>> 5131a1c63fb7aa0336ea44a078d08dc3e0a395b0
    public function getWechatApp(){
        if(!empty($app)) {
            $app = new Application(Yii::app()->params['wechat']);
        }
        return self::$app;
    }
}