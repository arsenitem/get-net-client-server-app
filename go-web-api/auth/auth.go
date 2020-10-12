package auth
import (
	"crypto/sha256"
	"../data"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"time"
	"net/http"
	"strings"
)
type loginResponse struct{
	Id string `json:"id"`
	Token string `json:"token"`
	Email string `json:"email"`
}
func Login(email string, password string) loginResponse {
	for _, item := range data.Users {
		if (item.Email == email && item.Password == sha256.Sum256([]byte(password))) {
			token := generateToken(item)
			return loginResponse{Id: item.Id, Token: token, Email: item.Email}
		}
	}

	return loginResponse{}
}




func Register(email string, password string)  {
	
}

func VerifyAccount() {

}

func sendMail() {

}


type MyCustomClaims struct {
    Email string `json:"email"`
    jwt.StandardClaims
}

func IsAuth(r *http.Request) bool {
	tokenString := parseToken(r)
	if (tokenString != "") {
		// Initialize a new instance of `Claims`
		claims := &MyCustomClaims{}

		tkn, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			return []byte("AllYourBase"), nil
		})
		if err != nil {
			fmt.Printf("%v", err)
			return false
		}
		if !tkn.Valid {
			fmt.Printf("not valid")
			return false
		}
		for _, item := range data.Users {
			if (item.Email == claims.Email) {		
				return true
			}
		}
	}
	
	return false
}

func generateToken(user data.User) string{
	claims := MyCustomClaims{
		user.Email,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Minute * 60).Unix(),
		},
	}
	mySigningKey := []byte("AllYourBase")
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	ss, _ := token.SignedString(mySigningKey)
	return ss
}
func parseToken(r *http.Request) string {
	auth:= r.Header.Get("Authorization")
	if (auth != "") {
		splitToken := strings.Split(auth, "Bearer ")
		reqToken := splitToken[1]
		return reqToken
	} else {
		return ""
	}
	
}