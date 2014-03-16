<div class="control-group redactor-container">
  <label class="control-label"></label>
  <div class="controls" ng-class="{'error' : $field.$invalid && $field.$dirty }">
    <textarea  class="span6" rows="5"  cols="20" rows="15" redactor=""></textarea>
    <span class="help-inline" ng-repeat="error in $fieldErrors" >{{$validationMessages[error](this)}}</span>
  </div>
</div>
 