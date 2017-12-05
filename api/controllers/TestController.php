<?php
namespace app\controllers;
use yii\web\Controller;
use Yii;
class TestController extends Controller{

    public function actionIndex(){
        if(Yii::$app->wechat->isWechat) {
            var_dump(456);
          }else{
              echo 123;
          }
        

    }



}






?>