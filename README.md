# puppeteer_exp
Experiment with puppeteer

## To build a standalone executable 

```console
npm install

npm run build

node --experimental-sea-config sea-config.json

node -e "require('fs').copyFileSync(process.execPath, 'scrape.exe')"

"C:\Program Files (x86)\Windows Kits\10\bin\10.0.22621.0\x64\signtool.exe" remove /s scrape.exe

npx postject scrape.exe NODE_SEA_BLOB sea-prep.blob --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2

"C:\Program Files (x86)\Windows Kits\10\bin\10.0.22621.0\x64\signtool.exe" sign /a /fd SHA256 scrape.exe
```
