<h1 class="list-heading">{{ $form.modelName }}</h1>
<div class="container edit-container">
    <form class="deform-form form-horizontal " name="modelForm" ng-submit="saveForm()">
        <fieldset class="deform-set" ng-repeat="groupName in groups.sorted_groups" ng-init="groupPaths = groups[groupName]">
            <legend ng-if="groupName">{{groupName | camelcase }}</legend>
            <div ng-repeat="path in groupPaths.sorted_paths" ng-init="pathData = groupPaths[path] ">
            	
            
            	<div class="control-group deform-field" ng-if="path == 'name' || path =='episodes' ">

				  <div class=" " ng-if="  pathData.options.type == 'String' ">
					<b>{{ instance[path] }} </b>
				  </div>
				  <div class=" " ng-if="  path == 'episodes'">
				  		<div ng-repeat="episode in  instance.episodes">
				  			<a href="#">Season {{ episode.season }} Episode {{ episode.number }}</a>
				  		</div>
				  </div>
				</div>
            </div>
        </fieldset>
        <div class="form-actions">
            <a class="btn btn-danger" href="/angoose/{{ $form.modelName }}/list" >Return </a>
        </div>
    </form>
</div>


 