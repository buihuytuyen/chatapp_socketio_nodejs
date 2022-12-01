let expect = require('expect');

var { generateMessage, generateLocationMessage } = require('./message');

describe('Generate Message', () => {
    it('should generate correct message object', () => {
        let from = 'MDJ',
            text = 'Some random text',
            message = generateMessage(from, text);

        expect.expect(typeof message.createdAt).toBe('number');
        expect.expect(message).toMatchObject({ from, text });
    });
});

describe('Generate Location Message', () => {
    it('should generate correct location message', () => {
        let from = 'Claire',
            lat = 15,
            lng = 56,
            url = `https://www.google.com/maps?q=${lat},${lng}`,
            message = generateLocationMessage(from, lat, lng);

        expect.expect(typeof message.createdAt).toBe('number');
        expect.expect(message).toMatchObject({ from, url });
    });
});
