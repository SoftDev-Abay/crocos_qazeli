This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.




{
    "message": "Вы успешно авторизовались",
    "data": {
        "id": 2,
        "role_id": 3,
        "first_name": "hotel",
        "last_name": "hotel",
        "middle_name": null,
        "phone": null,
        "email": "hotel@crocos.kz",
        "status": "active",
        "created_at": "2024-06-07T04:45:53.000000Z",
        "full_name": "Hotel Hotel ",
        "gender": null,
        "city": null,
        "region": null,
        "role": {
            "id": 3,
            "slug": "hotel",
            "title": "Отель",
            "created_at": "2024-06-07T04:45:53.000000Z",
            "permission": [
                {
                    "id": 105,
                    "slug": "booking_vouchers-show",
                    "title": "Booking Vouchers-show",
                    "created_at": "2024-06-07T04:45:53.000000Z"
                }
            ]
        }
    },
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiYTdhYWVjYWRlZjA3YjVhZWI2MjllOTQxOWFkZDZlZTRkOTk4ZGYyZmY4Y2E4ZWVjMjJlNjVmMGZjNTgyNjJjOGJjYmRmYWYyOTUwYzllNjQiLCJpYXQiOjE3MTg4NjI0OTYuMTE5NTA2LCJuYmYiOjE3MTg4NjI0OTYuMTE5NTEsImV4cCI6MTc1MDM5ODQ5Ni4xMDQyOTUsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.wSAXIV-_CtYg6iuwFLBa0x9U2Ki1xjiymoU57wzm973K1-lJnvlR1dBVWfuz3yJJA-t7WG0kw6i00HCOZujzKNQUWtY_cnfaZDifxbUrvFQZaFK0iJOYdSq1W5Jtb2Qdmneu0BexEUxGN-KVcey44GSvrvTPYPuwfnTdHU6kdQZE_q24YSTxd5FnLw29GzPdjJWNkZKJJUJrqd91Mr3cBCwKO5hV_UsnJqGoeCqd1ZGxQFptLw_tpjgewDUQmr4Sh0ZpfJEnLdPc1D3uHCuEaevW8eSN9niUmL6O9eQd2m8oMRTZ2pX5gKaeFl467xazNi3DS6YZm9ccdt7vgb6gHOhTmHm9FnY5R303iRFU2OVFXCbx57BtWYMNN8OJMIrBhFLzf8tqJcdeGu0SZKNPPg5GFprsSt1CnlOKAi9reJTG3hFhbohqc5N0omTUxQ9ynk20B8eINBwrkT-MCbJnBmhqQAIgaSeXlqT3EtdxzjctFzFQBUaUdwh8oBo2UH85JPW76RNFRnfuqRNRC8jKqcTtj_-FlUpfUnn8_VRBHhDJ1iI_o3IOlaxe-GaxJaBu2oVI7D9vpUs4bCdy2MzQ0-tuqcEG4JRAI7VgPwHsHPrsaV28RGp5lKHHrQ2vgzlL4C8G2ogVJPsuXgqbbPtnM7trbaH2cTSKYJDePhBTIws",
    "refresh_token": "def50200112b781b9b77c469cca446b28120c2f6547b7d783bf0d004edaae7353f8cdfb2c9023d4f633731b8e7170e9ae497f12f74fb80aa566ae2436146a11950db89b473ee3e266b311900e9c92a82824408c26e3341c525885ff5f7b926cda075bff6bf43d018f670f65519a4ac26754dd99e0c4efd3a74f3d8f71c0c0fc2ac84c082d0d223ccec248584f0a531a8b072a382c3e6fb6cd77714f15835c965b6a75ca16b05368d42f1556bb306a2ad781fb98419a4dfa29380154fcd6821500452a65ce2191ed83f707fd5c4028199374d69dcbbf4d072fe04ee5d01fe0b6183c1f73cee79c5be45b60c35cab02d43e8d2b667fd945ac2a95353216e70a02a9ce2c0d352480a168c062e613776565445be966fd6732dec06994e3a0d92720b33beb60b0d618e5a1e31349b91caf883e70b1ff72b6d302d2bcd0504fdd59e785d29f1abbadf090a8313e4469ca03f71aa30a8eebcd602fdc94458d74d7f732009"
}