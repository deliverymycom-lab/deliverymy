import React, { useState, useEffect } from 'react';
import { Language, UserRole, DriverProfile, AppConfig } from './types';
import { LanguageService } from './services/languageService';
import { StorageService } from './services/storageService';
import { HeaderBar } from './components/HeaderBar';
import { AdvertisementBanner } from './components/AdvertisementBanner';
import { SplashScreen } from './screens/SplashScreen';
import { DriverAuthScreen } from './screens/DriverAuthScreen';
import { CustomerHomeScreen } from './screens/CustomerHomeScreen';
import { DriverHomeScreen } from './screens/DriverHomeScreen';
import { AdminPanelScreen } from './screens/AdminPanelScreen';
import { FlutterCodeModal } from './components/FlutterCodeModal';
import { AdminPasswordModal } from './components/AdminPasswordModal';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>(LanguageService.getLanguage());
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);
  const [driverUser, setDriverUser] = useState<DriverProfile | null>(null);
  const [appConfig, setAppConfig] = useState<AppConfig>(StorageService.getConfig());

  // Layout view mode (Smartphone wrapper vs responsive web)
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(false);
  const [isFlutterModalOpen, setIsFlutterModalOpen] = useState<boolean>(false);
  const [isAdminPasswordModalOpen, setIsAdminPasswordModalOpen] = useState<boolean>(false);

  // Restore saved sessions if any & subscribe to config changes
  useEffect(() => {
    const session = StorageService.getSession();
    if (session.role === 'customer') {
      setCurrentRole('customer');
    } else if (session.role === 'driver' && session.user) {
      setDriverUser(session.user as DriverProfile);
      setCurrentRole('driver');
    } else if (session.role === 'admin') {
      setCurrentRole('admin');
    }

    const unsub = StorageService.subscribe(() => {
      setAppConfig(StorageService.getConfig());
    });
    return () => unsub();
  }, []);

  const handleLanguageChange = (lang: Language) => {
    LanguageService.setLanguage(lang);
    setCurrentLang(lang);
  };

  const handleRoleSelect = (role: UserRole) => {
    if (role === 'admin') {
      const session = StorageService.getSession();
      if (session.role === 'admin') {
        setCurrentRole('admin');
      } else {
        setIsAdminPasswordModalOpen(true);
      }
      return;
    }

    setCurrentRole(role);
    if (role === 'customer') {
      StorageService.setSession('customer', null);
    }
  };

  const handleAdminAuthSuccess = () => {
    setIsAdminPasswordModalOpen(false);
    StorageService.setSession('admin', null);
    setCurrentRole('admin');
  };

  const handleLogout = () => {
    StorageService.clearSession();
    setDriverUser(null);
    setCurrentRole(null);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FE] text-[#1A1A2E] flex flex-col font-sans selection:bg-[#FF6B00] selection:text-white">
      {/* Top Universal App Header */}
      <HeaderBar
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        currentRole={currentRole}
        onRoleSwitch={handleRoleSelect}
        onLogout={handleLogout}
        isMobileFrame={isMobileFrame}
        onToggleMobileFrame={() => setIsMobileFrame(!isMobileFrame)}
        onAdminLoginClick={() => handleRoleSelect('admin')}
      />

      {/* Top Advertisement Banner (Configured by Admin) */}
      <AdvertisementBanner ad={appConfig.advertisement?.topAd} position="top" />

      {/* Main Container Area */}
      <main className="flex-1 flex flex-col items-center justify-start p-1 sm:p-4 w-full">
        <div
          className={`w-full flex-1 flex flex-col transition-all duration-300 ${
            isMobileFrame
              ? 'max-w-[420px] my-2 sm:my-4 rounded-[36px] sm:rounded-[40px] border-4 sm:border-8 border-slate-800 bg-[#F8F9FE] shadow-2xl relative overflow-y-auto min-h-[720px] max-h-[88vh]'
              : 'max-w-4xl'
          }`}
        >
          {/* 1. Splash & Role Selection */}
          {currentRole === null && (
            <SplashScreen
              currentLang={currentLang}
              onSelectRole={handleRoleSelect}
              onAdminLoginClick={() => handleRoleSelect('admin')}
            />
          )}

          {/* 2. Customer Flow (Single Scroll Booking Form - Direct Submit - No Login) */}
          {currentRole === 'customer' && (
            <CustomerHomeScreen
              currentLang={currentLang}
              onBackToRoleSelect={handleLogout}
              onLogout={handleLogout}
            />
          )}

          {/* 3. Driver Flow */}
          {currentRole === 'driver' && (
            <>
              {driverUser ? (
                <DriverHomeScreen
                  driver={driverUser}
                  currentLang={currentLang}
                  onLogout={handleLogout}
                />
              ) : (
                <DriverAuthScreen
                  currentLang={currentLang}
                  onSuccess={(driver) => setDriverUser(driver)}
                  onBack={() => setCurrentRole(null)}
                />
              )}
            </>
          )}

          {/* 4. Admin Flow */}
          {currentRole === 'admin' && (
            <AdminPanelScreen
              currentLang={currentLang}
              onLogout={handleLogout}
              onOpenFlutterCode={() => setIsFlutterModalOpen(true)}
            />
          )}
        </div>
      </main>

      {/* Bottom Advertisement Banner (Configured by Admin) */}
      <AdvertisementBanner ad={appConfig.advertisement?.bottomAd} position="bottom" />

      {/* Flutter Source Code Modal */}
      <FlutterCodeModal
        isOpen={isFlutterModalOpen}
        onClose={() => setIsFlutterModalOpen(false)}
      />

      {/* Admin Password Authentication Modal */}
      <AdminPasswordModal
        isOpen={isAdminPasswordModalOpen}
        onClose={() => setIsAdminPasswordModalOpen(false)}
        onSuccess={handleAdminAuthSuccess}
        onOpenFlutterCode={() => setIsFlutterModalOpen(true)}
        currentLang={currentLang}
      />
    </div>
  );
}
