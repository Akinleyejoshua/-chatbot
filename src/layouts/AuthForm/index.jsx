const AuthForm = ({method, onSubmit, children, style}) => {
    return <form className="auth-form" onSubmit={onSubmit} method={method} style={style}>
        {children}
    </form>
}

export default AuthForm;