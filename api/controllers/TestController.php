<?php

if(Yii::$app->wechat->isWechat && !Yii::$app->wechat->isAuthorized()) {
  var_dump( Yii::$app->wechat->authorizeRequired()->send());
}else{
    echo 123;
}









?>