---
id: user-group-management
title: User Permission Management
---

This guide will walk you through the process of managing user permissions in ToolJet by setting up an example scenario. We’ll follow a step-by-step example of a company that uses ToolJet to build internal tools, and they need to manage user permissions for these teams effectively.

---

### Scenario
**TechCorp** wants to:
1. Invite three users: Alice (from Engineering), Bob (from Support), and Charlie (from Sales).
2. Create custom groups for each department: **Engineering**, **Support**, and **Sales**.
3. Assign permissions to specific apps and folders based on their departments.
4. Make Alice an admin who can manage the entire workspace.

---

### Step-by-Step Example: Managing User Permissions in ToolJet

#### Step 1: Accessing User Management Section
1. Log into ToolJet as the workspace admin.
2. Navigate to **Workspace Settings** from the sidebar.
3. Click on **Users and Groups** to manage users and set up groups.

#### Step 2: Inviting Users to the Workspace
Let’s invite Alice, Bob, and Charlie to the workspace:
1. In the **Users** section, click on **Invite Users**.
2. Enter the email addresses of the users:
   - Alice: `alice@techcorp.com`
   - Bob: `bob@techcorp.com`
   - Charlie: `charlie@techcorp.com`
3. Assign the default group **All Users** to each user (this happens automatically when they are invited).
4. The users will receive an email invitation to join the ToolJet workspace for **TechCorp**.

#### Step 3: Creating Custom Groups for Departments
Now we need to create custom groups for each department:
1. Go to the **Groups** section.
2. Click on **Create Group** and name the groups based on departments:
   - Group 1: **Engineering**
   - Group 2: **Support**
   - Group 3: **Sales**
3. Save the groups. These will be used to organize users based on their departments.

#### Step 4: Assigning Users to Groups
Next, we will assign Alice, Bob, and Charlie to their respective groups:
1. Go to the **Users** section.
2. Select Alice and assign her to the **Engineering** group.
3. Select Bob and assign him to the **Support** group.
4. Select Charlie and assign him to the **Sales** group.
   
This ensures that each user has the appropriate permissions based on their department.

#### Step 5: Assigning Permissions to Apps and Folders
Now we will assign permissions to specific apps and folders based on these groups.

##### Example 1: **Assigning Permissions to an App**
Let’s assume that **TechCorp** has an app called **"Bug Tracker"**, used by the Engineering team to track bugs.
1. Navigate to the **Apps** section in the workspace.
2. Click on the **Bug Tracker** app to open its settings.
3. Go to the **Permissions** tab.
4. Assign the **Engineering** group access to the app:
   - **Engineering** group → **Editor** access (can modify and update bugs).
5. Save the permissions.

This will ensure that only users in the **Engineering** group (like Alice) have editing access to the **Bug Tracker** app.

##### Example 2: **Assigning Permissions to a Folder**
Next, let’s assume there is a folder called **"Customer Tickets"**, used by the **Support** team to manage customer tickets.
1. Go to the **Folders** section.
2. Click on the **Customer Tickets** folder.
3. Navigate to the **Permissions** tab.
4. Assign the **Support** group access to the folder:
   - **Support** group → **Viewer** access (can only view customer tickets, but not modify them).
5. Save the permissions.

In this case, Bob (part of the **Support** group) will have view-only access to the **Customer Tickets** folder.

##### Example 3: **Managing Workspace Variables**
Let’s assume there’s a workspace variable called **"API_KEY"** that should be accessible only by the **Engineering** and **Admins** groups.
1. Go to the **Workspace Settings** and select **Workspace Variables**.
2. Find the **API_KEY** variable.
3. Under the **Permissions** section, assign access to the following groups:
   - **Engineering** group → **Viewer** access.
   - **Admins** group → **Editor** access (for managing the API key).
4. Save the permissions.

This ensures that only Engineering and Admin users can view or edit this sensitive workspace variable.

#### Step 6: Managing Admin Permissions
Now, we want to make Alice an admin, so she can help manage users and resources in the workspace:
1. Go to the **Groups** section.
2. Select the **Admins** group.
3. Add Alice to the **Admins** group by selecting her from the user list.
4. Alice now has full admin privileges, which means she can invite new users, assign permissions, and manage the workspace configuration.

#### Step 7: Removing a User from the Workspace
Let’s say Charlie (from Sales) leaves the company, and we need to remove him from the workspace:
1. Go to the **Users** section.
2. Find Charlie (`charlie@techcorp.com`) and select him.
3. Click **Remove User** to revoke his access to the workspace and all associated resources.

This action removes Charlie from the workspace, and he will no longer have access to any apps, folders, or variables in **TechCorp's** ToolJet workspace.

---

### Example Summary

- **Alice (Engineering)** was added to the **Engineering** group and granted **Editor** access to the **Bug Tracker** app and **Viewer** access to the **API_KEY** variable. Additionally, she was made an **Admin**.
- **Bob (Support)** was added to the **Support** group and granted **Viewer** access to the **Customer Tickets** folder.
- **Charlie (Sales)** was added to the **Sales** group but later removed from the workspace.

---

### Access Levels Recap

- **Viewer**: Can only view apps, folders, or variables, but cannot make changes.
- **Editor**: Can modify and update resources (apps, folders) but cannot manage settings.
- **Admin**: Full access to the entire workspace, including the ability to manage users, apps, folders, and variables.

---

### Best Practices for Permission Management (Based on the Example)

1. **Use Groups for Departments**: Organize users into department-specific groups (e.g., Engineering, Support, Sales). This makes it easy to manage permissions based on roles.
   
2. **Assign the Least Privilege**: Always grant the minimum level of access required. For example, Bob in the Support group only needs view access to the **Customer Tickets** folder.

3. **Review Permissions Regularly**: Periodically review the permissions and group memberships. For example, when Charlie left the company, he was promptly removed from the workspace.

---

### Conclusion

In this guide, we covered the entire process of user permission management in ToolJet, from inviting users to assigning specific access levels to apps, folders, and workspace variables. By organizing users into groups based on their roles, you can streamline permission management and ensure that sensitive data is only accessible to those who need it.

This approach helps maintain a secure and efficient workspace for your organization.