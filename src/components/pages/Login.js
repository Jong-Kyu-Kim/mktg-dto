import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import NProgress from 'nprogress';
import Layout from '../Layout';

const DIV = styled.div`
  margin: 100px auto;
  width: 235px;
  padding: 45px 55px;
  text-align: center;
  overflow: hidden;
  border: 1px solid #e4e6ea;
  border-radius: 10px;
  form > * {
    float: left;
  }
`;

const H1 = styled.h1`
  margin: 0 0 30px;
  font-size: 24px;
  span {
    font-size: 24px;
    color: #3b94e2;
  }
`;

const INPUT = styled.input`
  display: block;
  margin-bottom: 3px;
  padding-left: 3px;
  width: 150px;
  height: 36px;
  box-sizing: border-box;
  color: #000;
  font-family: sans-serif;
  border: 1px solid #e4e6ea;
  border-radius: 3px;
`;

const BUTTON = styled.button`
  margin-left: 5px;
  margin-bottom: 20px;
  width: 70px;
  height: 75px;
  vertical-align: top;
  background-color: #3b94e2;
  border: 1px solid #3b94e2;
  span {
    color: #fff;
  }
`;

const SPAN = styled.span`
  color: #3b94e2;
  text-decoration: underline;
`;

const Login = (props) => {
  const { loading, error, data, fetchMore, refetch, networkStatus } = useQuery(
    gql`
      query user {
        user {
          id
          dept
          name
        }
      }
    `,
    {
      onCompleted: ({ user }) => {
        user && props.history.push('/dashboard');
      },
    }
  );

  // const { user } = data;
  // !loading && user && props.history.push('/dto/dashboard');
  // if (state || user) return <Signout name={state ? state : user.name} refetch={refetch} setState={setState} />

  let id, password;

  const [signinUser] = useMutation(
    gql`
      mutation($id: String!, $password: String!) {
        signinUser(id: $id, password: $password) {
          id
          dept
          name
        }
      }
    `,
    {
      onCompleted: ({ signinUser }) => {
        NProgress.done();
        signinUser ? props.history.push('/dashboard') : alert('잘못된 로그인 정보이거나 권한이 없습니다.');
      },
      onError: (error) => {
        NProgress.done();
        console.log(error);
      },
    }
  );

  return (
    <Layout>
      <DIV>
        <H1>
          <span>MKTG</span> DTO
        </H1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();

            if (!id.value) {
              alert('아이디를 입력하세요.');
              id.focus();
              return false;
            }

            if (!password.value) {
              password.focus();
              alert('비밀번호를 입력하세요.');
              return false;
            }

            NProgress.start();

            signinUser({
              variables: {
                id: id.value,
                password: password.value,
              },
            });
          }}
        >
          {/* {error && <p>No user found.</p>} */}
          <div>
            <INPUT
              name="id"
              placeholder="id"
              ref={(node) => {
                id = node;
              }}
            />
            <INPUT
              type="password"
              name="password"
              placeholder="Password"
              ref={(node) => {
                password = node;
              }}
            />
          </div>
          <BUTTON>
            <span>로그인</span>
          </BUTTON>
        </form>
        <Link to="/dashboard">
          <SPAN>로그인 하지 않고 둘러보기</SPAN>
        </Link>
      </DIV>
    </Layout>
  );
};

export default Login;
