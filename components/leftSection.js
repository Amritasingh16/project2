import Head from 'next/head'
// import Image from 'next/image'
import styles from '../styles/Home.module.css'
import sectionStyles from './leftSection.module.css'
import {scaleFactor} from '../utils/constants'

const Spacer = ({ width = 0, height = 0 }) => <div style={{width, height}}/>

export default function LeftSection({
    collegeDetails
}) {

    const {
        fullName,
        logoLink:collegeLogo
    } = collegeDetails

    const [collegeFullName, collegeCity] = fullName?.split(',') || ['', '']

    return (
        <section className={`${styles.full} ${styles.section} ${sectionStyles.leftSection}`}>
            <Spacer height={'2.5rem'} />
            
            <div>
                <div className={sectionStyles.companyNameContainer}>
                    <img src={collegeLogo} alt="logo" width={80 * scaleFactor} height={80 * scaleFactor} />
                    <div style={{marginLeft:`1rem` }}>
                        <h2 className={sectionStyles.collegeName}>{collegeFullName.trim()}</h2>
                        {!!collegeCity && <small className={sectionStyles.collegeCity} >{collegeCity.trim()}</small>}
                    </div>
                </div>

                <Spacer height={'4rem'} />
                
                <h1 className={sectionStyles.descHeading}>Want to be a part <br/> of Company?</h1>

                <Spacer height={'1.7rem'} />
                
                <img src="/svgs/student.svg" alt="student reading" width={442 * scaleFactor} height={419 * scaleFactor} />
            </div>

            <Spacer height={'.5rem'} />
            
            <small className={`${sectionStyles.copyrightText} ${sectionStyles.hideCopyRightText}`}>Powered by <span style={{color:'#FF2231'}}>FunctionUp</span></small>
        </section>
    )
}
