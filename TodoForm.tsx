import axios from 'axios';
import { ErrorMessage, Field, Formik } from 'formik';
import React, { useState } from 'react'
import * as Yup from 'yup'


export default function TodoForm() {

    const [info,setValue] = useState({
      title:''
      ,content:''
    });
    const {title,content} = info;// 비구조화 할당을 통해 값 추출

    const onSubbit = (e : React.FormEvent) =>{
        e.preventDefault();
        setValue({title:'',content:''});
    }
    //input 입력시 변경 핸들러
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const { name, value } = e.target;// 우선 e.target 에서 name 과 value 를 추출
      setValue({
          ...info, // 기존의 input 객체를 복사한 뒤
          [name]: value,// name 키를 가진 값을 value 로 설정
      });
  };
  //유효성검사
  const vaildation = Yup.object().shape({
    title:Yup.string()
    .max(4,'4자리만 입력해주세요')
    .required('제목을 입력하세요'),

  })

  //글저장
  const save = (values: { title: string, content: string }) => {
    console.log(values);
    if (!values.title || !values.content) {
        return;
    }
    axios.post('http://localhost:3001/todos', {
        text: values.title,
        content: values.content,
        done: false
    }).then(res => {
        window.location.reload();
    });
}
  return (
    <Formik
    initialValues={info} //초기값
    validationSchema={vaildation}//스키마변수
    onSubmit={save}//form이 제출되었을떄 동작하는 변수 
>
    {({ handleSubmit, handleChange, values }) => (
        <div>TodoForm
            <form onSubmit={handleSubmit}>
                <div>
                    <Field
                        name="title"
                        placeholder='무엇을 하실건강?'
                        value={values.title}
                        onChange={handleChange}
                    />
                    <ErrorMessage name="title" component="div" className="error" />
                </div>
                <div>
                    <Field
                        name="content"
                        placeholder='누구랑 하실건강?'
                        value={values.content}
                        onChange={handleChange}
                    />
                </div>
                <button type='submit'>등록</button>
            </form>
        </div>
    )}
</Formik>
   
  )
}
