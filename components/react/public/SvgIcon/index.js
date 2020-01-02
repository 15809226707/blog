
import React from 'react'
import PropTypes from 'prop-types'
import './index.less'


const SvgIcon = props => {
    return (
        <svg style={{ fontSize: props.size, color: props.color }} className="svg-icon" aria-hidden="true">
            <use xlinkHref={`#${props.iconClass}`} />
        </svg>
    )

}

SvgIcon.defaultProps = {
    prefixCls: 'svg',
    size: '14px'
}


SvgIcon.propTypes = {
    size: PropTypes.string,
    color: PropTypes.string
}


export default SvgIcon