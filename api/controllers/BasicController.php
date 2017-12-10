<?php
namespace app\controllers;
use yii\web\Controller;
use Yii;
class BasicController extends Controller{

    	/*构造方法：确认是否有openid*/
	public function __construct($id,$module = null){
        
        parent::__construct($id,$module);

        use EasyWeChat\Foundation\Application;

        $this->app = new Application(Yii::params->wechat);
               
    }




}