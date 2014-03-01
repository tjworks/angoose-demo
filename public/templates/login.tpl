<div class="row-fluid" ng-controller='login-controller'>
	<div class="box-header">
	  	<h2>
	  		Angoose UI Demo
		</h2>
	</div>
	<div id="loginform" class="box-content" ng-if="user">
		<div class="row-fluid -form-container" >
				<fieldset class="-set">
					<legend>Welcome {{user.email}}</legend>
					
					Trying following links:
					
					<a href="/deform/todo/list"><h4>Manage Todos</h4></a>
					<a href="/deform/angoose-user/list"><h4>Manage Users</h4></a>
					<a href="/deform/role/list"><h4>Manage Permissions</h4></a>
				</fieldset>
		</div>
	</div>
	<div id="loginform" class="box-content" ng-if="!user">
		
		<div class="box-content">
			<button class="btn"   type="button" ng-click="adminLogin()">Log In as Demo Admin</button>
		</div>
		<div class="row-fluid -form-container" >
			<form class="form-horizontal span12" ng-submit="doLogin()">
				<fieldset class="-set">
					<legend>Log In Using email/password</legend>
					<div class="-fields">
						<div class="control-group -field">
							<div class="control-label"><label class="control-label">Email</label></div>
		  					<div class="controls">
				  				<input id="login-email" type="text"  ng-model="login.username" />
			  				</div>
						</div>
						<div class="control-group -field">
			  				<label class="control-label">Password</label>
			  				<div class="controls"><input id="login-password" type="password"  ng-model="login.password"/></div>
						</div>
					</div>
				</fieldset>
				<button class="btn"   type="submit">Log In</button>
				
				

			</form>
		</div>
	</div>
</div>