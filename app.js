/**
 * Serdar Sayın
 * Assignment
 */

let headersArray = ["Ürün Kodu","Ürün Adı","Birim Fiyatı(TL)", "Adet","Fiyat(TL)"];
let dataSourceArray = [[
    {
        "productid": "LT-1449506",
        "productName": "Super Outfit",
        "productPrice": 300.45,
        "qnty": 10
    },
    {
        "productid": "LT-4523632",
        "productName": "Rocket-Powered Roller Skates",
        "productPrice": 11367.99,
        "qnty": 4
    },
    {
        "productid": "TM-2026045",
        "productName": "Giant Kite Kit",
        "productPrice": 1099.90,
        "qnty": 12
    },
    {
        "productid": "LT-1990790",
        "productName": "Bird Seed",
        "productPrice": 5.90,
        "qnty": 55
    },
    {
        "productid": "TLTS-8002604",
        "productName": "Artificial Rock",
        "productPrice": 123.99,
        "qnty": 24
    },
    {
        "productid": "TM-6792415",
        "productName": "Giant Rubber Band V1",
        "productPrice": 44.90,
        "qnty": 5000
    },
    {
        "productid": "LT-8163469",
        "productName": "Jet Motor",
        "productPrice": 99999.99,
        "qnty": 2
    }
]
];
let table = new NTCTable(dataSourceArray,headersArray);
let totalMoney = 0;
let html = '';

let oneDigit = {
    '0': '',
    '1': 'bir',
    '2': 'iki',
    '3': 'üç',
    '4': 'dört',
    '5': 'beş',
    '6': 'altı',
    '7': 'yedi',
    '8': 'sekiz',
    '9': 'dokuz',
};
let doubleDigit = {
    '0': '',
    '1': 'on',
    '2': 'yirmi',
    '3': 'otuz',
    '4': 'kırk',
    '5': 'elli',
    '6': 'altmış',
    '7': 'yetmiş',
    '8': 'seksen',
    '9': 'doksan',
};



function numberToStringGenerator(figure) {
    let i = 0;
    let j  = 0;
    let beforeDot;
    let afterDot;
    let coefficients = ['bin ','milyon ','milyar '];
    let beforeDotString = '';
    let afterDotString = '';
    figure = figure.toString();
    beforeDot = figure.split('.')[0].toString();
    afterDot = figure.split('.')[1].toString();

    while(beforeDot.slice(i,i+3) !== ''){
        if (i === 3){
            beforeDotString += (coefficients[0]);
        }
        else if (i === 6){
            beforeDotString += (coefficients[1]);
        }
        else if(i === 9) {
            beforeDotString += (coefficients[2]);
        }
        beforeDotString += (threeDigitConverter(beforeDot.slice(i,i+3)));
        i = i+3;
    }
    while(afterDot.slice(j,j+3) !== ''){
        afterDotString += (threeDigitConverter(afterDot.slice(j,j+3)));
        j = j+3;
    }
    console.log(beforeDotString +'lira ' + afterDotString +' kuruş');
    return beforeDotString +' lira ' + afterDotString +' kuruş' ;
}

function threeDigitConverter(input) {
    let firstDigit = '';
    let secondDigit = '';
    let thirdDigit = '';

    if(input.length !== 3) {
        if (input.length === 2) {
            return oneDigit[input[1]] + doubleDigit[input[0]];
        }
        else if (input.length === 1) {
            return oneDigit[input[0]];
        }
    }
    else {
      firstDigit = oneDigit[input[2]] + ' ';
      secondDigit = doubleDigit[input[1]] + ' ';

      // Third Digit
        if (input[0] !== '0'){
            if(input[0] === '1'){
                thirdDigit = 'yüz ';
            }
            else {
                thirdDigit = oneDigit[input[0]] + ' yüz ';
            }
        }
        return thirdDigit + secondDigit + firstDigit;
    }
}

table.view = 'all';
table.dataSource[0].forEach(function (row) {
    row['total'] =  row['productPrice'] * row['qnty'];
    totalMoney = totalMoney + row['total'];
});

html = table.generateInnerHtmlCode();
stringNumber = numberToStringGenerator(totalMoney);

$(document).ready(function(){
    $('#table-container').append(html);
    $('.ntc-indicator-container').append('<div class="total"> ' +'<h1> TOPLAM</h1>'+ '<p class="total-amount">' + totalMoney + ' TL</p>' + '<p class="total-string">' + stringNumber +'</p>' + '</div>');
});

