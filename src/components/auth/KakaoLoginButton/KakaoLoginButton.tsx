export const KakaoLoginButton: React.FC = () => {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI

  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

  const handleLogin = () => {
    window.location.href = kakaoURL
  }

  return (
    <button onClick={handleLogin}>
      <img
        src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
        width="180"
        alt="카카오 로그인 버튼"
      />
    </button>
  )
}
