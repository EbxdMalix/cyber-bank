// Verify character indicator and video scrub behavior
// Run with: npx ts-node scripts/verify-fix.ts

import { chromium, Browser, Page } from 'playwright';

async function verifyBehavior() {
  let browser: Browser | undefined;
  try {
    console.log('🚀 Starting verification...\n');
    
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      ignoreHTTPSErrors: true
    });
    const page = await context.newPage();
    
    // Navigate to the app
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForSelector('video', { state: 'attached' });
    await page.waitForSelector('.character-indicator');
    
    // Wait for video to load metadata
    const duration = await page.evaluate(() => {
      const video = document.querySelector('video') as HTMLVideoElement;
      return video ? video.duration : 0;
    });
    console.log(`📹 Video duration: ${duration.toFixed(2)}s\n`);
    
    // Test 1: Mouse at left edge (0%)
    console.log('🖱️ Test 1: Mouse at LEFT edge (0%)');
    await page.mouse.move(1, 360);
    await page.waitForTimeout(500);
    
    const charLeft1 = await page.$eval('.character-indicator', el => 
      (el as HTMLElement).style.left
    );
    const videoTime1 = await page.$eval('video', (el: HTMLVideoElement) => el.currentTime);
    console.log(`   → Character left: ${charLeft1}`);
    console.log(`   → Video time: ${videoTime1.toFixed(2)}s`);
    console.log(`   → Expected: char ~0%, video ~${duration.toFixed(2)}s (END)\n`);
    
    // Test 2: Mouse at right edge (100%)
    console.log('🖱️ Test 2: Mouse at RIGHT edge (100%)');
    await page.mouse.move(1279, 360);
    await page.waitForTimeout(500);
    
    const charLeft2 = await page.$eval('.character-indicator', el => 
      (el as HTMLElement).style.left
    );
    const videoTime2 = await page.$eval('video', (el: HTMLVideoElement) => el.currentTime);
    console.log(`   → Character left: ${charLeft2}`);
    console.log(`   → Video time: ${videoTime2.toFixed(2)}s`);
    console.log(`   → Expected: char ~100%, video ~0s (START)\n`);
    
    // Test 3: Mouse at center (50%)
    console.log('🖱️ Test 3: Mouse at CENTER (50%)');
    await page.mouse.move(640, 360);
    await page.waitForTimeout(500);
    
    const charLeft3 = await page.$eval('.character-indicator', el => 
      (el as HTMLElement).style.left
    );
    const videoTime3 = await page.$eval('video', (el: HTMLVideoElement) => el.currentTime);
    console.log(`   → Character left: ${charLeft3}`);
    console.log(`   → Video time: ${videoTime3.toFixed(2)}s`);
    console.log(`   → Expected: char ~50%, video ~${(duration/2).toFixed(2)}s (MIDDLE)\n`);
    
    // Verify
    const charLeftPercent = parseFloat(charLeft1.replace('%', ''));
    const charRightPercent = parseFloat(charLeft2.replace('%', ''));
    
    const passed = 
      charLeftPercent < 5 && // character near 0% when mouse left
      charRightPercent > 95 && // character near 100% when mouse right
      videoTime1 > duration - 0.5 && // video near end when mouse left
      videoTime2 < 0.5; // video near start when mouse right
    
    if (passed) {
      console.log('✅ ALL CHECKS PASSED!');
      console.log('   • Character follows mouse directly (left→left, right→right)');
      console.log('   • Video scrubs inverted (right→start, left→end)');
    } else {
      console.log('❌ CHECKS FAILED!');
      console.log('   • Character or video behavior is incorrect');
    }
    
    await browser.close();
    process.exit(passed ? 0 : 1);
    
  } catch (error) {
    console.error('❌ Error:', error);
    if (browser) await browser.close();
    process.exit(1);
  }
}

verifyBehavior();
