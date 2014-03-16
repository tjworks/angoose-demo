<style>
    .form-login {
        max-width: 330px;
        padding: 15px;
        margin: 0 auto;
    }
    .form-login .form-heading{
        margin-bottom: 20px;
        text-align: center;
    }
    .form-login .form-control {
        position: relative;
        height: auto;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px;
        font-size: 16px;
    }
    .form-login .form-control:focus {
        z-index: 2;
    }
    .form-login input[type="email"] {
        margin-bottom: 10px;
        width: 100%;
    }
    .form-login input[type="password"] {
        margin-bottom: 10px;
        width: 100%;
    }

</style>

<div class="container " ng-controller='login-controller' >
    <form id="loginform" ng-submit="doLogin()" class="form-login" role="form" ng-if="!user">
        <h2 class="form-heading">Angoose UI Demo</h2>
        <input class="form-control" placeholder="Email address"  autofocus id="login-email" ng-model="login.password" type="email" >
        <input class="form-control" placeholder="Password"  id="login-password" ng-model="login.password"  type="password">
        <button class="btn btn-primary btn-block"   type="submit">Log In</button>
        <button class="btn btn-success btn-block"   type="button" ng-click="adminLogin()">Log In as Demo Admin</button>
    </form>
</div>
