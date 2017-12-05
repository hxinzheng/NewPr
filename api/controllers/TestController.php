<?php
namespace app\controllers;
use yii\web\Controller;
use Yii;
class TestController extends Controller{

    public function actionIndex(){
        if(Yii::$app->wechat->isWechat) {
            var_dump( Yii::$app->wechat->authorizeRequired()->send());
          }else{
              echo 123;
          }
        

    }



}






?>