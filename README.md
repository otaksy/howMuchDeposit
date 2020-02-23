# howMuchDeposit
500円硬貨を入れる前提のXX万円貯まる貯金箱に500円だけを入れることは中々出来ないため、
他の硬貨をある割合で入れたら結局いくら貯められるのかを算出するAPIを起動する事が出来ます。

以下、API仕様
- リクエスト(request)
  - ヘッダ(header): "Content-Type: application/json"
  - ボディ(body): maxAmount ... 貯金箱の最大貯金額(0より大きい整数)
| - ボディ(body): ratio ... 1, 5, 10, 50, 100, 500円をどの割合で貯金するかオブジェクトで記載(割合の合計は1)

- レスポンス(response)
  - 正常系(success)
    - ステータス(status): 200
    - Content-type: application/json
    - 値(value): {deposit: 300000} ... 貯金可能額(deposit)
  - 異常系(failed)
    - ステータス(status): 400, 500
    - Content-type: application/problem+json
    - メッセージ(message): エラーの理由(Error reason)

Calculate how much deposit in a piggy bank

## How to use
### Start the server
- Install modules
```shell
npm install
```

- Start the server
```shell
npm start
```

## Send a request
### Example
```shell
curl -X POST localhost:${PORT}/api/v1/howMuchDeposit -H "Content-Type: application/json" -d '{"maxAmount": 300000, "ratio": {"1": 0, "5": 0, "10": 0, "50": 0, "100": 0.7, "500": 0.3}}'
```