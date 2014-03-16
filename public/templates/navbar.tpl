<div class="navbar-inner" ng-controller="nav-controller" >
	<div class="container">
		<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"><i class="icon-reorder">  </i></a>
			<ul class="nav" >
                
                <li ><a href="/login">HOME</a></li>
                <li><a href="/todomvc">Todo</a></li>
                <li class="dropdown"  ng-if="user" >
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"  >Admin <i class="icon-chevron-down"></i></a>
                    <ul class="dropdown-menu">
                        <li><a href="/deform/todo/list">Manage Todos</a></li>
                        <li><a href="/deform/angoose-user/list">Manage Users</a></li>
                        <li><a href="/deform/role/list">Manage Permissions</a></li>

                    </ul>
                </li>
                <li class="pull-right"  ng-if="user" ><a href="#">  </a></li>
                <li ng-if="user"><a href="#">   Welcome, {{ user.email }} </a></li>
				<li class="pull-right"><a href="/logout" ng-click="doLogout()" ng-if="user">Logout</a></li>
				
      		</ul>
	</div>
</div>
