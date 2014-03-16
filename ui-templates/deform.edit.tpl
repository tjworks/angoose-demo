<h1 class="list-heading">Edit {{ $form.modelName }}</h1>
<div class="container edit-container">
    <form class="deform-form form-horizontal " name="modelForm" ng-submit="saveForm()">
        <fieldset class="deform-set" ng-repeat="groupName in groups.sorted_groups" ng-init="groupPaths = groups[groupName]">
            <legend ng-if="groupName">{{groupName | camelcase }}</legend>
            <div ng-repeat="path in groupPaths.sorted_paths" ng-init="pathData = groupPaths[path]">
                <deform-field  path="path" field-schema="pathData" model-schema="$form.modelSchema" instance="instance"  ></deform-field>
            </div>
        </fieldset>
        <div class="form-actions">
            <button class="btn btn-success"  type="submit">Save </button>
            <button class="btn btn-danger" type="button" ng-click="cancelEdit()">Cancel </button>
        </div>
    </form>
</div>