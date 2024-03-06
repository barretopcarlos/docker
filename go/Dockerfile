FROM golang:latest as builder

# Desabilitanto suporte a módulos Go (corrigir erros de go.mod)
ENV GO111MODULE=off

WORKDIR /app
COPY main.go .

RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

FROM scratch

WORKDIR /root/

COPY --from=builder /app/main .

CMD ["./main"]
