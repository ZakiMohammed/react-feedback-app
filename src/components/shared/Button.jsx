import PropTypes from 'prop-types'

function Button({ children, version, type, isDisabled, handleClick }) {
    return (
        <button type={type} className={`btn btn-${version}`} disabled={isDisabled} onClick={handleClick}>
            {children}
        </button>
    )
}

Button.defaultProps = {
    version: 'primary',
    type: 'button',
    isDisabled: false
}

Button.propTypes = {
    version: PropTypes.string,
    type: PropTypes.string,
    isDisabled: PropTypes.bool
}

export default Button
