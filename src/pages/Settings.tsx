
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SettingsProfile from '@/components/settings/SettingsProfile';
import SettingsNotifications from '@/components/settings/SettingsNotifications';
import SettingsAppearance from '@/components/settings/SettingsAppearance';
import SettingsSecurity from '@/components/settings/SettingsSecurity';

const Settings = () => {
  return (
    <MainLayout>
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences.
            </p>
          </div>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-6">
              <SettingsProfile />
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6">
              <SettingsNotifications />
            </TabsContent>
            
            <TabsContent value="appearance" className="space-y-6">
              <SettingsAppearance />
            </TabsContent>
            
            <TabsContent value="security" className="space-y-6">
              <SettingsSecurity />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
