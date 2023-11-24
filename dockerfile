FROM golang:alpine
#FROM golang:1.21

WORKDIR /usr/src/app

# pre-copy/cache go.mod for pre-downloading dependencies and 
# only redownloading them in subsequent builds if they change
COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY . .

# COPY /pkg .
# COPY books.db .
# COPY favicon.svg .
# COPY LICENSE .

RUN go build -v -o app .

ENTRYPOINT [ "/usr/src/app/app" ]
