export const KakaoLoginButton: React.FC<{ login: () => void }> = ({
  login,
}) => {
  return (
    <button onClick={login}>
      <img
        src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
        width="180"
        alt="카카오 로그인 버튼"
      />
    </button>
  )
}
