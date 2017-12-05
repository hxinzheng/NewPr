<?php
namespace app\controllers;
use yii\web\Controller;
use Yii;
use app\common\BaseController;
class TestController extends BaseController{

    public function actionIndex(){
        if(Yii::$app->wechat->isWechat) {
            var_dump(456);
          }else{
            echo 123;
          }
        

    }



}






?>