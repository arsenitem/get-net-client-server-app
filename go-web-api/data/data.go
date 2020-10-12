package data
import "crypto/sha256"

type responseItem interface {
}

type User struct {
	Id string `json:"id"`
	Email string `json:"email"`
	Password [32]byte `json:"password"`
	FirstName string `json:"firstName"`
	LastName string `json:"lastName"`
	BirthDate string `json:"birthDate"`
	RegDate string `json:"regDate"`
	IsEmailVerified bool `json:"isEmailVerified"`
	Balance float32 `json:"balance"`
}
type Line struct {
	Type string `json:"type"`
	CLI string `json:"CLI"`
	City string `json:"city"`
	Tariff string `json:"tariff"`
	Record bool `json:"record"`
}

type Items []responseItem

var Users = []User{
	User{Id: "123", Email: "admin@mail.ru", Password: sha256.Sum256([]byte("123")), FirstName: "test", LastName:"test", IsEmailVerified: true, Balance: 100},
}
var AllLines =Items{
	Line{Type:"39950", CLI:"78001003419", City:"Россия, Пермь", Tariff:"Посекундный", Record:true},
	Line{Type:"39951", CLI:"73422700590",  City:"Россия, Пермь", Tariff:"Посекундный", Record:false},
	Line{Type:"39952", CLI:"73422700590",  City:"Россия, Пермь", Tariff:"Посекундный", Record:true},
	Line{Type:"39953", CLI:"73422700590",  City:"Россия, Пермь", Tariff:"Посекундный", Record:false},
	Line{Type:"39954", CLI:"78001003419",  City:"Россия, Пермь", Tariff:"Посекундный", Record:false},
	Line{Type:"39955", CLI:"78001003419",  City:"Россия, Пермь", Tariff:"Посекундный", Record:false},
	Line{Type:"39956", CLI:"78021003419",  City:"Россия, Пермь", Tariff:"Посекундный", Record:false},
	Line{Type:"39957", CLI:"78041003419",  City:"Россия, Пермь", Tariff:"Посекундный", Record:true},
	Line{Type:"39958", CLI:"78002203419",  City:"Россия, Пермь", Tariff:"Посекундный", Record:true},
	Line{Type:"39959", CLI:"78001023419",  City:"Россия, Пермь", Tariff:"Посекундный", Record:true},
	Line{Type:"39960", CLI:"78201003419",  City:"Россия, Пермь", Tariff:"Посекундный", Record:true},
}

func GetLines(page int) Items {
	return getSlice(AllLines, (page-1)*10, page*10)
}

func getSlice(array Items, start int, end int) Items{
	arrLen := len(array)
	if (start >= arrLen) {
		return []responseItem{}
	}
	if (end <= arrLen) {
		return array[start: end]
	} else {
		return array[start:arrLen]
	}
}