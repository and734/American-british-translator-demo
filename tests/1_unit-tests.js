
const chai = require('chai');
const assert = chai.assert;

const Translator = require("../components/translator.js");
let translator = new Translator();



suite('Unit Tests', () => {
    suite("Translate to British English", ()=>{
        test('Mangoes are my favorite fruit. (to British)', (done)=>{
            assert.equal(
                translator.toBritishEnglish('Mangoes are my favorite fruit.').replace(/<span class="highlight">(.*?)<\/span>/g, '$1'),
                'Mangoes are my favourite fruit.'
            );
            done();
        });
        test('I ate yogurt for breakfast. (to British)', (done)=>{
            assert.equal(
                translator.toBritishEnglish('I ate yogurt for breakfast.').replace(/<span class="highlight">(.*?)<\/span>/g, '$1'),
                'I ate yoghurt for breakfast.'
            );
            done();
        });
        test("We had a party at my friend's condo. (to British)", (done)=>{
            assert.equal(
                translator.toBritishEnglish("We had a party at my friend's condo.").replace(/<span class="highlight">(.*?)<\/span>/g, '$1'),
                `We had a party at my friend's flat.`
            );
            done();
        });
        test("Can you toss this in the trashcan for me? (to British)", (done)=>{
            assert.equal(
                translator.toBritishEnglish("Can you toss this in the trashcan for me?").replace(/<span class="highlight">(.*?)<\/span>/g, '$1'),
                `Can you toss this in the bin for me?`
            );
            done();
        });
        test("The parking lot was full. (to British)", (done)=>{
            assert.equal(
                translator.toBritishEnglish("The parking lot was full.").replace(/<span class="highlight">(.*?)<\/span>/g, '$1'),
                `The car park was full.`
            );
            done();
        });
        test("Like a high tech Rube Goldberg machine. (to British)", (done)=>{
            assert.equal(
                translator.toBritishEnglish("Like a high tech Rube Goldberg machine.").replace(/<span class="highlight">(.*?)<\/span>/g, '$1'),
                `Like a high tech Heath Robinson device.`
            );
            done();
        });
        test("To play hooky means to skip class or work. (to British)", (done)=>{
            assert.equal(
                translator.toBritishEnglish("To play hooky means to skip class or work.").replace(/<span class="highlight">(.*?)<\/span>/g, '$1'),
                `To bunk off means to skip class or work.`
            );
            done();
        });
        test("No Mr. Bond, I expect you to die. (to British)", (done)=>{
            assert.equal(
                translator.toBritishEnglish("No Mr. Bond, I expect you to die.").replace(/<span class="highlight">(.*?)<\/span>/g, '$1'),
                `No Mr Bond, I expect you to die.`
            );
            done();
        });
        test("Dr. Grosh will see you now. (to British)", (done)=>{
            assert.equal(
                translator.toBritishEnglish("Dr. Grosh will see you now.").replace(/<span class="highlight">(.*?)<\/span>/g, '$1'),
                `Dr Grosh will see you now.`
            );
            done();
        });
        test("Lunch is at 12:15 today.(to British)", (done)=>{
            assert.equal(
                translator.toBritishEnglish("Lunch is at 12:15 today.").replace(/<span class="highlight">(.*?)<\/span>/g, '$1'),
                `Lunch is at 12.15 today.`
            );
            done();
        });
        
    });
    suite("Translate to American English", ()=>{
        test("We watched the footie match for a while.(to American)", (done)=>{
            assert.equal(
                translator.toAmericanEnglish("We watched the footie match for a while.").replace(/<span class="highlight">(.*?)<\/span>/g, '$1'),
                `We watched the soccer match for a while.`
            );
            done();
        });
        test("Paracetamol takes up to an hour to work.(to American)", (done)=>{
            assert.equal(
                translator.toAmericanEnglish("Paracetamol takes up to an hour to work.").replace(/<span class="highlight">(.*?)<\/span>/g, '$1'),
                `Tylenol takes up to an hour to work.`
            );
            done();
        });
        test("First, caramelise the onions.(to American)", (done)=>{
            assert.equal(
                translator.toAmericanEnglish("First, caramelise the onions.").replace(/<span class="highlight">(.*?)<\/span>/g, '$1'),
                `First, caramelize the onions.`
            );
            done();
        });
        test("I spent the bank holiday at the funfair.(to American)", (done)=>{
            assert.equal(
                translator.toAmericanEnglish("I spent the bank holiday at the funfair.").replace(/<span class="highlight">(.*?)<\/span>/g, '$1'),
                `I spent the public holiday at the carnival.`
            );
            done();
        });
        test("I had a bicky then went to the chippy.(to American)", (done)=>{
            assert.equal(
                translator.toAmericanEnglish("I had a bicky then went to the chippy.").replace(/<span class="highlight">(.*?)<\/span>/g, '$1'),
                `I had a cookie then went to the fish-and-chip shop.`
            );
            done();
        });
        test("I've just got bits and bobs in my bum bag.(to American)", (done)=>{
            assert.equal(
                translator.toAmericanEnglish("I've just got bits and bobs in my bum bag.").replace(/<span class="highlight">(.*?)<\/span>/g, '$1'),
                `I've just got odds and ends in my fanny pack.`
            );
            done();
        });
        test("The car boot sale at Boxted Airfield was called off. (to American)", (done)=>{
            assert.equal(
                translator.toAmericanEnglish("The car boot sale at Boxted Airfield was called off.").replace(/<span class="highlight">(.*?)<\/span>/g, '$1'),
                `The swap meet at Boxted Airfield was called off.`
            );
            done();
        });
        test("Have you met Mrs Kalyani? (to American)", (done)=>{
            assert.equal(
                translator.toAmericanEnglish("Have you met Mrs Kalyani?").replace(/<span class="highlight">(.*?)<\/span>/g, '$1'),
                `Have you met Mrs. Kalyani?`
            );
            done();
        });
        test("Prof Joyner of King's College, London. (to American)", (done)=>{
            assert.equal(
                translator.toAmericanEnglish("Prof Joyner of King's College, London.").replace(/<span class="highlight">(.*?)<\/span>/g, '$1'),
                `Prof. Joyner of King's College, London.`
            );
            done();
        });
        test("Tea time is usually around 4 or 4.30. (to American)", (done)=>{
            assert.equal(
                translator.toAmericanEnglish("Tea time is usually around 4 or 4.30.").replace(/<span class="highlight">(.*?)<\/span>/g, '$1'),
                `Tea time is usually around 4 or 4:30.`
            );
            done();
        });
       
        
    });
    suite("Highlight translation (to british highlight)", ()=>{
        test("Mangoes are my favorite fruit. ", (done)=>{
            assert.equal(
                translator.toBritishEnglish("Mangoes are my favorite fruit."),
                `Mangoes are my <span class="highlight">favourite</span> fruit.`
            );
            done();
        });
        test("I ate yogurt for breakfast. (to British highlight)", (done)=>{
            assert.equal(
                translator.toBritishEnglish("I ate yogurt for breakfast."),
                `I ate <span class="highlight">yoghurt</span> for breakfast.`
            );
            done();
        });
        test("We watched the footie match for a while.  (to British highlight)", (done)=>{
            assert.equal(
                translator.toAmericanEnglish("We watched the footie match for a while."),
                `We watched the <span class="highlight">soccer</span> match for a while.`
            );
            done();
        });
        test("Paracetamol takes up to an hour to work.  (to British highlight)", (done)=>{
            assert.equal(
                translator.toAmericanEnglish("Paracetamol takes up to an hour to work."),
                `<span class="highlight">Tylenol</span> takes up to an hour to work.`
            );
            done();
        }); 
        
    });
});