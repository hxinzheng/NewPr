<?php
namespace app\controllers;
use yii\web\Controller;
use Yii;
class TestController extends Controller{

    public function index(){
        if(Yii::$app->wechat->isWechat && !Yii::$app->wechat->isAuthorized()) {
            var_dump( Yii::$app->wechat->authorizeRequired()->send());
          }else{
              echo 123;
          }
        

    }



}






?>