import Head from 'next/head'
// import Image from 'next/image'
import styles from '../styles/Home.module.css'
import sectionStyles from './rightSection.module.css'
import leftSectionStyles from './leftSection.module.css'
import {useState, useEffect} from 'react';
import {scaleFactor, placementInterestApi} from '../utils/constants'


function maskMail(email) {
    if (typeof email !== 'string' )
        return email
    
    const [name, domain] = email.split('@')
    const maskedName = `${name.slice(0, name.length / 2)}${'*'.repeat(name.length / 2)}`
    return maskedName + (domain ? '@' : '') + (domain || '')
}

const brandNames = [
    {
        name: 'Practo',
        image:''
    },
    {
        name: 'Walmart',
        image:''
    },
    {
        name: 'Amazon',
        image:''
    },
    {
        name: 'BigBasket',
        image:''
    },
    {
        name: 'OYO',
        image:''
    },
    {
        name: 'Meesho',
        image:''
    },
    {
        name: 'Razorpay',
        image:''
    },
    {
        name: 'Netflix',
        image:''
    },
    {
        name: 'Twitter',
        image:''
    }
]

const Spacer = ({ width = 0, height = 0 }) => <div style={{ width, height }} />

// const AttachFile = () => (
//     <div style={{ display: 'flex' }} >
//         <span style={{color:'red'}} >&#128206;</span>
//         <span>Attach file</span>
//     </div>
// )

export default function RightSection({
    collegeDetails,
    refreshCollegeDetails
}) {
    const [internIntention, setInternIntention] = useState(1)
    const [applyForInternFormValues, setApplyForInternFormValues] = useState({})
    const [hireForInternFormValues, setHireForInternFormValues] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const {
        interns:interests,
        name:collegeName,
        fullName
    } = collegeDetails
    
    const renderApplyInternForm = [
        {
            placeholder:'Name',
            type: 'text',
            id: 'name',
            handleOnChange
        },
        {
            placeholder: 'Email Address',
            type: 'email',
            id: 'email',
            handleOnChange
            
        },
        {
            placeholder: 'WhatsApp No.',
            type: 'number',
            id:'mobile',
            maxlength: 10,
            handleOnChange
            
        },
        {
            placeholder: 'Resume upload',
            type: 'file',
            id: 'cv',
            handleOnChange:handleOnChangeFile
            
        }
    ]
        
    const renderHireInternForm = [
        {
            placeholder:'Company Name',
            type: 'text',
            id:'name',
            handleOnChange
        },
        {
            placeholder: 'Location',
            type: 'text',
            id: 'location',
            handleOnChange
        },
        {
            placeholder: 'Phone No.',
            type: 'number',
            id:'mobile',
            maxlength: 10,
            handleOnChange
        },
        {
            placeholder: 'Email Address',
            type: 'email',
            id: 'email',
            handleOnChange
        }
    ]
    
    const formDataToRender = internIntention === 0 ? renderApplyInternForm : renderHireInternForm
    const setForm = internIntention === 0 ? setApplyForInternFormValues : setHireForInternFormValues
    const filledForm = internIntention === 0 ? applyForInternFormValues : hireForInternFormValues

    function getIntroText() {
        if (internIntention === 0)
            return 'Join as a Software Developer Intern in a top tier company. Register Now.'
        
        return `Looking to hire interns from ${fullName}? Register Now.`
    }

    function onClickInternIntention(e) {
        if (e.target.value == undefined || e.target.value === internIntention)
            return
        
        setInternIntention(Number(e.target.value))
    }

    function getSelectedDivClassName() {
        if (internIntention === 0)
            return `${sectionStyles.selectedToggleBtn} ${sectionStyles.selectedToggleBtnLeft}`
        
        return `${sectionStyles.selectedToggleBtn} ${sectionStyles.selectedToggleBtnRight}`
    }

    function getInternIntentionClassName(value) {
        const isSelected = internIntention === value
            
        if (isSelected)
            return `${sectionStyles.toggleBtn} ${sectionStyles.whiteText}`
        
        return sectionStyles.toggleBtn
    }

    
    function handleOnChange(id, e) {
        setForm({
            ...filledForm,
            [id]:e.target.value
        })
    }

    function handleOnChangeFile(id, e) {
        const file = e.target.files[0]
        
        setApplyForInternFormValues({
            ...applyForInternFormValues,
            [id]: file,
            cvName:file.name
        })
    }

    async function submitInternForm() {
        try {
            setIsLoading(true)

            if (
                Object.keys(filledForm).length < 4
                || Object.values(filledForm).filter(item => !item).length
            ) {
                alert('All fields are mandatory')
                return
            }

            if (internIntention === 1) {
                // TODO: use setTimeout with loader
                alert('your request has been submitted successfully')
                setHireForInternFormValues({})
                return 
            }

            const formData = new FormData();
            Object.keys(applyForInternFormValues).forEach(key => formData.append(key, applyForInternFormValues[key]))
            formData.append('collegeName', collegeName)

            const response = await fetch(placementInterestApi, {
                method: 'POST',
                body: formData
            })
            const val = await response.json()

            if(val.status === false) 
                throw ''
            
            alert('Your request has been submitted successfully. You will be contacted soon')
            setApplyForInternFormValues({})
            refreshCollegeDetails()
        } catch (error) {
            console.log(error, 'post')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className={`${styles.section} ${sectionStyles.rightSection}`}>
            {/* {isLoading && <div className={styles.loader}/>} */}

            <Spacer height={'2.5rem'} />
            
            <div onClick={onClickInternIntention} className={sectionStyles.internToggleBtnContainer} >
                <div className={getSelectedDivClassName()} />
                <button value={0} className={getInternIntentionClassName(0)}>Apply for internship</button>
                <button value={1} className={getInternIntentionClassName(1)}>Hire Software Interns</button>
            </div>

            <Spacer height={'2.5rem'} />

            {internIntention === 1 && Array.isArray(interests) && !!interests.length && (
                <div className={sectionStyles.interestContainer} >
                    <div className={sectionStyles.interestRow} key={0}>
                        <span className={sectionStyles.rowItemHeading} style={{flex:.75}} >S. no</span>
                        <span className={sectionStyles.rowItemHeading} style={{flex:1}}>Intern Name</span>
                        <span className={sectionStyles.rowItemHeading} style={{flex:1 }}>Email Address</span>
                    </div>
                    {interests.map((interest, index) => (
                        <div className={sectionStyles.interestRow} key={interest._id}>
                            <span style={{flex:.75, fontSize:'.87rem', fontWeight:'700'}} >{`${index+1}. `}</span>
                            <span style={{flex:1, fontSize:'.87rem', fontWeight:'700'}}>{interest.name}</span>
                            <span style={{flex:1, fontSize:'.87rem', }}>{maskMail(interest.email)}</span>
                        </div>
                    ))}
                </div>
            )}
            
            <Spacer height={'1.5rem'} />

            <p className={sectionStyles.intro_text} >{getIntroText()}</p>

            <Spacer height={'1.5rem'} />

            <div className={sectionStyles.inputContainer}>
                {formDataToRender.map(({
                        id,
                        type,
                        handleOnChange,
                        placeholder
                }) => (
                    <div key={id} className={sectionStyles.formElementContainer}>
                        <label  htmlFor={id} className={sectionStyles.labelBox} style={{color:applyForInternFormValues['cvName']? 'black' : '#caccdd'}} >
                            {id === 'cv' && (applyForInternFormValues['cvName'] || placeholder)}
                            {/* <input id={id} type={type} required autoComplete className={sectionStyles.inputBox} placeholder={placeholder} /> */}
                        </label>
                        <input
                            onChange={e => handleOnChange(id, e)}
                            // accept="application/pdf, application/doc"
                            value={filledForm[id === 'cv' ? '' : id] || ''} // because file type value is read-only, it is an uncontrolled component 
                            id={id}
                            type={type}
                            required
                            autoComplete='on'
                            className={sectionStyles.inputBox}
                            placeholder={placeholder} />
                    </div>
                ))}
            </div>

            <Spacer height={'1.25rem'} />

            <button disabled={isLoading} className={sectionStyles.applyBtn} onClick={submitInternForm} >Apply Now</button>

            {internIntention === 0 && (
                <>
                    <Spacer height={'4rem'} />

                    <p>More than 200+ Brands trust us</p>

                    <Spacer height={'1rem'} />
                    
                    {/* <Image src="/company-image.png" alt="companies" width={729} height={30} /> */}
                    <img src="/svgs/companies.svg" alt="companies" width={750 * scaleFactor} height={40 * scaleFactor} />


                    {/* <div className={sectionStyles.companyContainer} >
                        {brandNames.map(brand => (
                            <div key={brand.name} >{brand.name}</div>
                        ))}
                    </div> */}
                </>
            )}

            <Spacer height={'2rem'} />

            <small className={`${leftSectionStyles.copyrightText} ${sectionStyles.copyrightText}`}>Powered by <span style={{color:'#FF2231'}}>FunctionUp</span></small>
            
            <Spacer height={'2rem'} />

        </section>
    )
}
