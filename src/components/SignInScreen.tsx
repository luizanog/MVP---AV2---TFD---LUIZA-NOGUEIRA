import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';

interface SignInScreenProps {
  onSuccess: (email: string) => void;
}

export default function SignInScreen({ onSuccess }: SignInScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please entry both your email address and password.');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);

    // Simulate validation and API latency to make the app feel extremely high-end
    setTimeout(() => {
      setIsLoading(false);
      onSuccess(email);
    }, 1200);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setForgotSuccess(true);
    }, 1000);
  };

  return (
    <div className="relative min-h-screen bg-[#fcf8ff] text-[#1b1b23] font-sans flex items-center justify-center p-6 overflow-hidden">
      {/* Background radial blurs */}
      <div className="absolute top-[-80px] left-[-80px] w-[500px] h-[500px] bg-[#2c2abc] filter blur-[100px] opacity-25 rounded-full pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[450px] h-[450px] bg-[#bdc2ff] filter blur-[100px] opacity-40 rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-[#2d37a0] filter blur-[90px] opacity-15 rounded-full pointer-events-none"></div>

      {/* Login Card */}
      <main className="w-full max-w-[460px] relative z-10">
        <div className="bg-[rgba(255,255,255,0.73)] backdrop-blur-[24px] border border-[rgba(226,232,240,0.8)] rounded-[32px] p-8 md:p-10 shadow-2xl transition-all duration-300">
          
          {/* Back to sign in link for password recovery */}
          {isForgotPassword ? (
            <div>
              <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#2c2abc] mb-4 shadow-lg shadow-[#2c2abc]/20">
                  <Sparkles className="text-white w-8 h-8" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-[#2c2abc]">Password Recovery</h1>
                <p className="text-sm text-[#464554] mt-2">Discovery Studio</p>
              </div>

              {forgotSuccess ? (
                <div className="text-center py-4">
                  <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl mb-6 text-sm border border-emerald-100">
                    A secure password recovery token has been transmitted to <strong className="break-all">{forgotEmail}</strong>. Please review your inbox.
                  </div>
                  <button
                    onClick={() => {
                      setIsForgotPassword(false);
                      setForgotSuccess(false);
                      setForgotEmail('');
                    }}
                    className="w-full h-14 bg-[#2c2abc] text-white rounded-xl font-bold hover:bg-[#4648d4] transition-all flex items-center justify-center gap-2"
                  >
                    Return to Sign In
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#767586] block ml-2">Registered Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#767586]">
                        <Mail className="w-5 h-5" />
                      </div>
                      <input
                        className="w-full h-14 pl-12 pr-4 bg-[#f5f2fe] border-none rounded-xl focus:ring-2 focus:ring-[#2c2abc] transition-all text-sm placeholder:text-[#c6c5d7] focus:outline-none"
                        placeholder="name@company.com"
                        type="email"
                        required
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-14 bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-white rounded-xl font-bold shadow-lg shadow-orange-500/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-75"
                  >
                    {isLoading ? 'Sending Token...' : 'Track My Credentials'}
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotPassword(false);
                        setForgotEmail('');
                      }}
                      className="text-sm font-bold text-[#2c2abc] hover:underline"
                    >
                      Bypass & Sign In
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <>
              {/* Logo Header */}
              <div className="mb-8 text-center select-none">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#2c2abc] mb-4 shadow-lg shadow-[#2c2abc]/25">
                  <Sparkles className="text-white w-8 h-8 animate-pulse" />
                </div>
                <h1 id="brand-title" className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#2c2abc]">TrendClarity</h1>
                <p className="text-sm text-[#464554] font-medium tracking-wide mt-1">Discovery Studio</p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMsg && (
                  <div className="p-3 bg-red-50 text-xs text-red-600 rounded-xl border border-red-100">
                    {errorMsg}
                  </div>
                )}

                <div className="space-y-1.5 animate-fade-in">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#767586] block ml-2" htmlFor="email-input">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#767586]">
                      <Mail className="w-5 h-5" />
                    </div>
                    <input
                      id="email-input"
                      className="w-full h-14 pl-12 pr-4 bg-[#f5f2fe] border-none rounded-xl focus:ring-2 focus:ring-[#2c2abc] transition-all text-sm placeholder:text-[#c6c5d7] focus:outline-none text-[#1b1b23]"
                      placeholder="name@company.com"
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#767586] block ml-1" htmlFor="password-input">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsForgotPassword(true)}
                      className="text-xs font-bold text-[#2c2abc] hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#767586]">
                      <Lock className="w-5 h-5" />
                    </div>
                    <input
                      id="password-input"
                      className="w-full h-14 pl-12 pr-4 bg-[#f5f2fe] border-none rounded-xl focus:ring-2 focus:ring-[#2c2abc] transition-all text-sm placeholder:text-[#c6c5d7] focus:outline-none text-[#1b1b23]"
                      placeholder="••••••••"
                      required
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                {/* Keep me signed in */}
                <div className="flex items-center gap-3 px-1">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-5 h-5 rounded border-[#c6c5d7] text-[#2c2abc] focus:ring-[#2c2abc] cursor-pointer"
                  />
                  <label htmlFor="remember" className="text-sm text-[#464554] select-none cursor-pointer">
                    Keep me signed in
                  </label>
                </div>

                {/* Submit button */}
                <button
                  id="sign-in-button"
                  className="w-full h-14 bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-white rounded-xl font-bold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-75"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Verifying Gateway...' : 'Sign In'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-[#c6c5d7]/30"></div>
                <span className="text-[11px] font-bold tracking-widest text-[#c6c5d7] whitespace-nowrap">OR CONTINUE WITH</span>
                <div className="flex-1 h-px bg-[#c6c5d7]/30"></div>
              </div>

              {/* Social login integration buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => onSuccess('google-sso@company.com')}
                  className="flex items-center justify-center h-12 gap-2 bg-white border border-[#c6c5d7]/40 rounded-xl hover:bg-[#e9e7f2]/30 active:scale-95 transition-all group cursor-pointer"
                >
                  <img
                    alt="Google"
                    className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity"
                    src="https://lh3.googleusercontent.com/aida/AP1WRLtYARveZN9iPo6JOxYqcX9w8X-K1akEpd2Y8i5Rbs_6hl8t31rysS791jATFaSftAfq8E64X-oiXReKQI05S_0PN1IcdLKgUwxHIsBmX-rmRaUCTdSHWqvVs9L0sct1EHaRyWfN-3vFsc_DSz9T59LV_sYJeSGrDB476SUqQgaV2bL-ieSVVM-Fh8qdUWjeWFehjTCmvYmRRlPxXreS_oUDLgomYp5Shf18deJFgyMAZa3J6xEoG41HOFM"
                  />
                  <span className="text-xs font-bold text-[#1b1b23]">Google</span>
                </button>
                <button
                  onClick={() => onSuccess('fb-sso@company.com')}
                  className="flex items-center justify-center h-12 gap-2 bg-white border border-[#c6c5d7]/40 rounded-xl hover:bg-[#e9e7f2]/30 active:scale-95 transition-all group cursor-pointer"
                >
                  <span className="text-[#1877F2] font-black text-sm tracking-wider">f</span>
                  <span className="text-xs font-bold text-[#1b1b23]">Facebook</span>
                </button>
              </div>

              {/* Guest / Bypass Button */}
              <div className="mt-4 pt-1 flex justify-center">
                <button
                  onClick={() => onSuccess('guest-trial@company.com')}
                  className="text-xs text-[#2c2abc]/80 hover:text-[#2c2abc] font-semibold border-b border-[#2c2abc]/30 hover:border-[#2c2abc] transition-all"
                >
                  Enter Studio as Guest
                </button>
              </div>

              {/* Registration offer */}
              <p className="mt-8 text-center text-xs text-[#464554]">
                Don't have an account?{' '}
                <button
                  onClick={() => onSuccess('welcome-newbie@company.com')}
                  className="text-[#2c2abc] font-bold hover:underline"
                >
                  Join Discovery Studio
                </button>
              </p>
            </>
          )}
        </div>

        {/* Brand footer disclaimer */}
        <div className="mt-6 text-center">
          <p className="text-[11px] leading-relaxed text-[#767586]/80 px-6">
            By signing in, you agree to our <span className="hover:underline cursor-pointer">Terms of Service</span> and <span className="hover:underline cursor-pointer">Privacy Policy</span>. Created for high-fidelity client validation.
          </p>
        </div>
      </main>
    </div>
  );
}
