// src/pages/Settings.tsx
import { useState } from 'react';
import { Save, User, Shield, Bell, CreditCard, Globe, Download,  Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { color } from 'framer-motion';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    
  });
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    transactionAlerts: true,
    securityAlerts: true,
    marketingEmails: false,
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'preferences', label: 'Preferences', icon: Globe },
  ];

  const handleSaveProfile = () => {
    console.log('Profile saved:', profileData);
    // Add your save logic here
  };

  const handleSecurityChange = () => {
    console.log('Security settings updated');
    // Add your security update logic here
  };

  const handleExportData = () => {
    console.log('Exporting data...');
    // Add export logic here
  };

  const handleDeleteAccount = () => {
    console.log('Account deletion requested');
    // Add account deletion logic here
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gold">Settings</h1>
        <p className="text-gray-500">Manage your account settings and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <Card className="lg:w-1/4 border-0 shadow-md bg-lighter">
          <CardContent className="p-4">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                      isActive
                        ? 'bg-bin text-hover/70'
                        : 'text-gray-600 hover:bg-bin/80'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:w-3/4 space-y-6">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <Card className="border-0 shadow-md bg-lighter">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gold">
                  <User size={20} />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Update your personal information and how others see you on the platform.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gold">
                  <div>
                    <Label htmlFor="firstName ">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      style={{ color: 'gray'}}
                      onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                      className='bg-bin border-none'
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      style={{ color: 'gray'}}
                      onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                      className='bg-bin border-none'
                    />
                  </div>
                
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      style={{ color: 'gray'}}
                      className='bg-bin border-none'
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      style={{ color: 'gray'}}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className='bg-bin border-none'
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleSaveProfile} className="gap-2 bg-hover/70 text-bin hover:bg-hover/80">
                      <Save size={16} />
                      Save Changes
                    </Button>
                  </div>
                </div>  
              </CardContent>
            </Card>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <Card className="border-0 shadow-md bg-lighter">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gold">
                  <Shield size={20} />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Manage your password and security preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-gold">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={securityData.currentPassword}
                    onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                    className='bg-bin border-none'
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={securityData.newPassword}
                    onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                    className='bg-bin border-none'
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={securityData.confirmPassword}
                    onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                    className='bg-bin border-none'
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-bin rounded-lg">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication <span className='text-gray-600'>(Unavailable)</span> </h4>
                    <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleSecurityChange} className="gap-2 bg-hover/70 text-lighter hover:bg-hover/80">
                    <Save size={16} />
                    Update Security
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <Card className="border-0 shadow-md bg-lighter">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gold">
                  <Bell size={20} />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Choose how you want to be notified about your account activity.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-bin rounded-lg">
                  <div>
                    <h4 className="font-medium text-gold">Email Notifications</h4>
                    <p className="text-sm text-gray-400">Receive important updates via email</p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onChange={(e) => setNotifications({ ...notifications, emailNotifications: e.target.checked })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-bin rounded-lg">
                  <div>
                    <h4 className="font-medium text-gold">SMS Notifications</h4>
                    <p className="text-sm text-gray-400">Get text messages for important alerts</p>
                  </div>
                  <Switch
                    checked={notifications.smsNotifications}
                    onChange={(e) => setNotifications({ ...notifications, smsNotifications: e.target.checked })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-bin rounded-lg">
                  <div>
                    <h4 className="font-medium text-gold">Push Notifications</h4>
                    <p className="text-sm text-gray-400">Receive browser or app notifications</p>
                  </div>
                  <Switch
                    checked={notifications.pushNotifications}
                    onChange={(e) => setNotifications({ ...notifications, pushNotifications: e.target.checked })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-bin rounded-lg">
                  <div>
                    <h4 className="font-medium text-gold">Transaction Alerts</h4>
                    <p className="text-sm text-gray-400">Get notified for all transactions</p>
                  </div>
                  <Switch
                    checked={notifications.transactionAlerts}
                    onChange={(e) => setNotifications({ ...notifications, transactionAlerts: e.target.checked })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-bin rounded-lg">
                  <div>
                    <h4 className="font-medium text-gold">Security Alerts</h4>
                    <p className="text-sm text-gray-400">Important security notifications</p>
                  </div>
                  <Switch
                    checked={notifications.securityAlerts}
                    onChange={(e) => setNotifications({ ...notifications, securityAlerts: e.target.checked })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-bin rounded-lg">
                  <div>
                    <h4 className="font-medium text-gold">Marketing Emails</h4>
                    <p className="text-sm text-gray-400">Receive offers and promotions</p>
                  </div>
                  <Switch
                    checked={notifications.marketingEmails}
                    onChange={(e) => setNotifications({ ...notifications, marketingEmails: e.target.checked })}
                  />
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => console.log('Notifications saved')} className="gap-2 bg-hover/70 text-gem hover:bg-hover/80">
                    <Save size={16} />
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Payment Methods */}
          {activeTab === 'payment' && (
            <Card className="border-0 shadow-md bg-lighter">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gold">
                  <CreditCard size={20} />
                  Payment Methods
                </CardTitle>
                <CardDescription>
                  Manage your payment methods for deposits and withdrawals.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-bin">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gold/40 rounded-full flex items-center justify-center">
                        <CreditCard size={16} className="text-gold" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gold">Visa ending in 4582</h4>
                        <p className="text-sm text-gray-600">Expires 12/2024</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className='bg-bin border-none text-gold hover:bg-hover/70 hover:text-lighter'>Edit</Button>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-bin">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gold/40 rounded-full flex items-center justify-center">
                        <CreditCard size={16} className="text-gold" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gold">Mastercard ending in 7821</h4>
                        <p className="text-sm text-gray-600">Expires 09/2025</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className='bg-bin border-none text-gold hover:bg-hover/70 hover:text-lighter'>Edit</Button>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-bin">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-lighter/50 rounded-full flex items-center justify-center">
                        <CreditCard size={16} className="text-hover/60" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gold">PayPal</h4>
                        <p className="text-sm text-gray-600">Connected</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" disabled>Edit</Button>
                  </div>
                </div>
                
                <Button className="w-full bg-hover/70 text-gem border-none hover:bg-hover/90 hover:text-gem" variant="outline">
                  + Add Payment Method
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Preferences */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <Card className="border-0 shadow-md bg-lighter">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gold">
                    <Globe size={20} />
                    Language & Region
                  </CardTitle>
                  <CardDescription>
                    Customize your language and regional settings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-gold">
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <select
                      id="language"
                      className="w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/40 bg-bin text-gray-400"
                    >
                      <option value="en">English</option>
                      <option value="fr">French</option>
                      <option value="es">Spanish</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <select
                      id="timezone"
                      className="w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/40 text-gray-400 bg-bin"
                    >
                      <option value="est">Eastern Time (ET)</option>
                      <option value="cst">Central Time (CT)</option>
                      <option value="mst">Mountain Time (MT)</option>
                      <option value="pst">Pacific Time (PT)</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="currency">Currency</Label>
                    <select
                      id="currency"
                      className="w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/40 bg-bin text-gray-400"
                    >
                      <option value="usd">USD ($)</option>
                      <option value="eur">EUR (€)</option>
                      <option value="gbp">GBP (£)</option>
                      <option value="jpy">JPY (¥)</option>
                    </select>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={() => console.log('Preferences saved')} className="gap-2 bg-hover/80 text-gem">
                      <Save size={16} />
                      Save Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md bg-lighter">
                <CardHeader className='text-gold'>
                  <CardTitle>Data Management</CardTitle>
                  <CardDescription>
                    Manage your data export and account deletion.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-bin rounded-lg">
                    <div>
                      <h4 className="font-medium text-gold">Export Data</h4>
                      <p className="text-sm text-gray-500">Download all your data in a ZIP file</p>
                    </div>
                    <Button variant="outline" onClick={handleExportData} className="gap-2 border-none bg-gold">
                      <Download size={16} />
                      Export
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-bin rounded-lg ">
                    <div>
                      <h4 className="font-medium text-hover">Delete Account</h4>
                      <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
                    </div>
                    <Button variant="destructive" onClick={handleDeleteAccount} className="gap-2 text-gem">
                      <Trash2 size={16} />
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}