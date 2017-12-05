<?php
namespace app\common;
use EasyWeChat\Foundation\Application;
use yii\web\Controller;
use Yii;

/**
 * Public abstract controller
 */
class BaseController extends Controller{

    public function getWechatApp(){
        return new Application(Yii::app()->params['wechat']);
    }
}