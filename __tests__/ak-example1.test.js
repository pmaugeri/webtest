const timeout = 10000;

// User Agent for a Chrome desktop browser
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36';

// Constants to be adapted to website being tested
const HOME_PAGE_URL = 'https://www.yourdomain.com';
const CP_CODE = '123456'; 

const AkamaiPragmaHeaders = require('../lib/AkamaiPragmaHeaders.js');
var akPragma;


describe(
    'Home page',
    () => {
        let page;
        let response;

        beforeAll(async () => {
          page = await global.__BROWSER__.newPage();
	  page.setUserAgent(USER_AGENT);	
	  AkamaiPragmaHeaders.addPragmaHeaders(page);
          response = await page.goto(HOME_PAGE_URL);
	  akPragma = new AkamaiPragmaHeaders(response);
        }, timeout);

        test('Status Code should be 200', async () => {
          expect(response.status()).toBe(200);
        });

        test('x-cache should contain _HIT', async () => {
	  expect(akPragma.getXCacheTCP()).toContain('_HIT');
        });

        test("CP Code should be " + CP_CODE, async () => {
	  expect(akPragma.getCPCode()).toBe(CP_CODE);
	});

	test("TTL is 3 days", async () => {
	  expect(akPragma.getTTL()).toBe('3d');
	});
    },
    timeout,
);
