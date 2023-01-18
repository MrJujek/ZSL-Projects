<head>
    <title>Sign In</title>
    <link rel="stylesheet" href="/style/style.css">
</head>
<body>
    <div class="LogInDiv">
        <form method="GET" id="formSignIn" action="/">
            <label for="loginInput">Login:</label>
            <input type="text" name="logininput" id="logininput">
            
            <label for="passwordInput">Password:</label>
            <input type="password" name="passwordInput" id="passwordInput">

            <input type="submit" value="Sign in"/>
        </form>
        <a href="/signup">Or sign up here</a>
    </div>
</body>

<?php
$i = 0;

for ($i = 0; $i < 10; $i++) {
    echo $i;
}
?>