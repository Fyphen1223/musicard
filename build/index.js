const { Canvas } = require('canvas-constructor/cairo');
const canvas = require('canvas');
canvas.registerFont('node_modules/musicard/res/momcakebold.ttf', { family: 'momcakebold' });

async function musicCard({ name, author, progress, thumbnail, color, starttime, endtime, mode }) {
    if (!name) { throw new Error('Missing name parameter') }
    if (!author) { throw new Error('Missing author parameter') }

    let validatedProgress = parseFloat(progress);
    if (Number.isNaN(validatedProgress) || validatedProgress < 0 || validatedProgress > 100) { throw new Error('Invalid progress parameter, must be between 0 to 100') }

    if (validatedProgress < 2) { validatedProgress = 2 }

    const thumbnailURL = thumbnail || 'https://avatars.githubusercontent.com/u/84311327?v=4';
    const validatedColor = color || 'ff0000';
    const validatedStartTime = starttime || '0:00';
    const validatedEndTime = endtime || '0:00';
    const validatedMode = mode || 'play';

    const progressBarWidth = (validatedProgress / 100) * 1700;
    const circleX = progressBarWidth;

    let modeimage = await canvas.loadImage('node_modules/musicard/res/blank.png');

    if (validatedMode === 'pause') {
        modeimage = await canvas.loadImage('node_modules/musicard/res/pause.png');
    } else {
        modeimage = await canvas.loadImage('node_modules/musicard/res/blank.png');
    }

    const progressBarCanvas = canvas.createCanvas(1700, 40);
    const progressBarCtx = progressBarCanvas.getContext('2d');
    const cornerRadius = 15;
    progressBarCtx.beginPath();
    progressBarCtx.moveTo(cornerRadius, 0);
    progressBarCtx.lineTo(1700 - cornerRadius, 0);
    progressBarCtx.arc(1700 - cornerRadius, cornerRadius, cornerRadius, 1.5 * Math.PI, 2 * Math.PI);
    progressBarCtx.lineTo(1700, 40 - cornerRadius);
    progressBarCtx.arc(1700 - cornerRadius, 40 - cornerRadius, cornerRadius, 0, 0.5 * Math.PI);
    progressBarCtx.lineTo(cornerRadius, 40);
    progressBarCtx.arc(cornerRadius, 40 - cornerRadius, cornerRadius, 0.5 * Math.PI, Math.PI);
    progressBarCtx.lineTo(0, cornerRadius);
    progressBarCtx.arc(cornerRadius, cornerRadius, cornerRadius, Math.PI, 1.5 * Math.PI);
    progressBarCtx.closePath();
    progressBarCtx.fillStyle = '#ababab';
    progressBarCtx.fill();
    progressBarCtx.beginPath();
    progressBarCtx.moveTo(cornerRadius, 0);
    progressBarCtx.lineTo(progressBarWidth - cornerRadius, 0);
    progressBarCtx.arc(
        progressBarWidth - cornerRadius,
        cornerRadius,
        cornerRadius,
        1.5 * Math.PI,
        2 * Math.PI,
    );
    progressBarCtx.lineTo(progressBarWidth, 40);
    progressBarCtx.lineTo(cornerRadius, 40);
    progressBarCtx.arc(cornerRadius, 40 - cornerRadius, cornerRadius, 0.5 * Math.PI, Math.PI);
    progressBarCtx.lineTo(0, cornerRadius);
    progressBarCtx.arc(cornerRadius, cornerRadius, cornerRadius, Math.PI, 1.5 * Math.PI);
    progressBarCtx.closePath();
    progressBarCtx.fillStyle = `#${validatedColor}`;
    progressBarCtx.fill();

    const circleCanvas = canvas.createCanvas(1800, 1800);
    const circleCtx = circleCanvas.getContext('2d');

    const circleRadius = 36;
    const circleY = 80;

    circleCtx.beginPath();
    circleCtx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
    circleCtx.fillStyle = `#${validatedColor}`;
    circleCtx.fill();

    const img = await canvas.loadImage('node_modules/musicard/res/background.png');

    const thumbnailCanvas = canvas.createCanvas(1000, 1000);
    const thumbnailCtx = thumbnailCanvas.getContext('2d');

    let thumbnailImage;

    try {
        thumbnailImage = await canvas.loadImage(thumbnailURL);
    } catch (error) {
        thumbnailImage = await canvas.loadImage('https://avatars.githubusercontent.com/u/84311327?v=4');
    }

    const thumbnailSize = Math.min(thumbnailImage.width, thumbnailImage.height);
    const thumbnailX = (thumbnailImage.width - thumbnailSize) / 2;
    const thumbnailY = (thumbnailImage.height - thumbnailSize) / 2;

    thumbnailCtx.beginPath();
    const cornerRadius2 = 45;
    thumbnailCtx.moveTo(0 + cornerRadius2, 0);
    thumbnailCtx.arcTo(
        thumbnailCanvas.width,
        0,
        thumbnailCanvas.width,
        thumbnailCanvas.height,
        cornerRadius2,
    );
    thumbnailCtx.arcTo(
        thumbnailCanvas.width,
        thumbnailCanvas.height,
        0,
        thumbnailCanvas.height,
        cornerRadius2,
    );
    thumbnailCtx.arcTo(
        0,
        thumbnailCanvas.height,
        0,
        0,
        cornerRadius2,
    );
    thumbnailCtx.arcTo(
        0,
        0,
        thumbnailCanvas.width,
        0,
        cornerRadius2,
    );
    thumbnailCtx.closePath();
    thumbnailCtx.clip();

    thumbnailCtx.drawImage(
        thumbnailImage,
        thumbnailX,
        thumbnailY,
        thumbnailSize,
        thumbnailSize,
        0,
        0,
        thumbnailCanvas.width,
        thumbnailCanvas.height,
    );

    if (name.length > 15) name = `${name.slice(0, 15)}...`;
    if (author.length > 15) author = `${author.slice(0, 15)}...`;

    const image = new Canvas(3264, 1275)
        .printImage(img, 0, 0, 3264, 1275)
        .setColor(`#${validatedColor}`)
        .setTextFont('200px momcakebold')
        .printText(`${name}`, 200, 340)

        .setColor('#fff')
        .setTextFont('170px momcakebold')
        .printText(`${author}`, 200, 500)

        .setColor('#fff')
        .setTextFont('60px momcakebold')
        .printText(`${validatedStartTime}`, 220, 1070)

        .setColor('#fff')
        .setTextFont('60px momcakebold')
        .printText(`${validatedEndTime}`, 1820, 1070)

        .printImage(thumbnailCanvas, 2115, 115, 1040, 1040)

        .printImage(modeimage, 0, 0, 3264, 1275)

        .printImage(progressBarCanvas, 220, 950, 1700, 40)
        .printImage(circleCanvas, 210, 890, 1800, 1800)
        .toBuffer();

    return image;
}

module.exports = {
    musicCard
}