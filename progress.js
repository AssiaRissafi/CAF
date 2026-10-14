// progress.js: كيحفظ التقدم والألماس والقلوب فـ المتصفح

// ===== الإعدادات (تقدر تبدلهم) =====
const passPercent = 50;     // خاصك تجاوب على أكثر من 50% باش تنجح
const startHearts = 5;      // عدد القلوب
const refillMinutes = 60;   // شحال من دقيقة كنتسناو باش القلوب ترجع


// ===== القلوب =====

// كتجيب عدد القلوب (وإلا داز الوقت كترجعهم 5)
function getHearts() {
  let hearts = startHearts;
  if (localStorage.getItem("hearts") !== null) {
    hearts = Number(localStorage.getItem("hearts"));
  }

  // إلا سالاو القلوب وداز الوقت: كنرجعو 5
  const refillAt = Number(localStorage.getItem("refillAt")) || 0;
  if (hearts === 0 && refillAt > 0 && Date.now() >= refillAt) {
    hearts = startHearts;
    localStorage.setItem("hearts", hearts);
    localStorage.removeItem("refillAt");
  }
  return hearts;
}

// كتنقص قلب. إلا سالاو القلوب كتبدا الساعة
function loseHeart() {
  const hearts = getHearts() - 1;
  localStorage.setItem("hearts", hearts);

  if (hearts <= 0) {
    localStorage.setItem("hearts", 0);
    localStorage.setItem("refillAt", Date.now() + refillMinutes * 60 * 1000);
  }
}

// كتقول شحال بقا (بالميلي ثانية) باش القلوب ترجع
function getRefillLeft() {
  const refillAt = Number(localStorage.getItem("refillAt")) || 0;
  const left = refillAt - Date.now();
  if (left < 0) return 0;
  return left;
}


// ===== نهاية الدرس =====

// كتحفظ النجوم وكتفتح الدرس اللي من بعد (كنحتافظو بأحسن نجوم)
function finishLevel(level, stars) {
  const oldStars = Number(localStorage.getItem("stars" + level)) || 0;
  if (stars > oldStars) {
    localStorage.setItem("stars" + level, stars);
  }

  const unlocked = Number(localStorage.getItem("unlocked")) || 1;
  if (level + 1 > unlocked) {
    localStorage.setItem("unlocked", level + 1);
  }
}

// كتناديها فـ نهاية كل درس: endLevel(1, 80) يعني جاوب على 80%
// إلا نجح: كترجع عدد النجوم (1 أو 2 أو 3)
// إلا خسر: كتنقص قلب وكترجع 0
function endLevel(level, percent) {
  if (percent > passPercent) {
    let stars = 1;
    if (percent === 100) {
      stars = 3;
    } else if (percent >= 75) {
      stars = 2;
    }
    finishLevel(level, stars);
    return stars;
  }

  loseHeart();
  return 0;
}


// ===== الألماس =====

// كتزيد الألماس للمجموع المحفوظ: addDiamonds(10)
function addDiamonds(amount) {
  const total = Number(localStorage.getItem("diamonds")) || 0;
  localStorage.setItem("diamonds", total + amount);
}

// كتمسح كلشي (للتجربة فقط): كتب resetProgress() فـ Console
function resetProgress() {
  localStorage.clear();
}
