import React from "react";
import './styles.scss'
import Loader from 'react-loader-spinner'

const LoadingIndicator = () => {
    return(
        <Loader
         type="TailSpin"
         color="#1da1f2"
         height={35}
         width={35}
         timeout={15000} //3 secs
      />
    )
}

export default LoadingIndicator;