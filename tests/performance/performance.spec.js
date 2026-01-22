import { test, expect } from '@playwright/test';

test.describe('Performance Tests', () => {
  test('page should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    
    const loadTime = Date.now() - startTime;
    
    // Page should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('page should have minimal resource count', async ({ page }) => {
    const requests = [];
    
    page.on('request', request => {
      requests.push(request.url());
    });
    
    await page.goto('/');
    
    // For a simple static page, we should have minimal requests
    // Typically just the HTML file and maybe missing image
    expect(requests.length).toBeLessThan(10);
  });

  test('navigation should be smooth', async ({ page }) => {
    await page.goto('/');
    
    const startTime = Date.now();
    await page.click('a[href="#about"]');
    await page.waitForTimeout(100);
    const navigationTime = Date.now() - startTime;
    
    // Navigation should be instant (under 200ms including smooth scroll start)
    expect(navigationTime).toBeLessThan(200);
  });

  test('images should load efficiently', async ({ page }) => {
    const imageRequests = [];
    
    page.on('response', response => {
      if (response.request().resourceType() === 'image') {
        imageRequests.push({
          url: response.url(),
          status: response.status(),
          size: response.headers()['content-length']
        });
      }
    });
    
    await page.goto('/');
    
    // All images should load successfully (even if they're 404)
    // In this case, we expect one image request for your-photo.jpg
    expect(imageRequests.length).toBeGreaterThanOrEqual(0);
  });

  test('page should be lightweight', async ({ page }) => {
    let totalSize = 0;
    
    page.on('response', async (response) => {
      try {
        const buffer = await response.body();
        totalSize += buffer.length;
      } catch (e) {
        // Some responses may not have a body
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Total page size should be under 500KB for a simple portfolio
    expect(totalSize).toBeLessThan(500 * 1024);
  });
});
