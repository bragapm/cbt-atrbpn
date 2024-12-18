export default (router, { services }) => {
  const { ItemsService } = services;

  const ADMIN_ROLE_ID = 'fa064cca-97c3-473c-b9bf-2fe2c196d22e'; 
  const VERIFIKATOR_ROLE_ID = 'f2acda8a-8eba-4a4f-a374-7f85e8d9e02b'; 

  // register user
  router.post('/', async (req, res) => {
      const { email, password, first_name, roleName } = req.body;
      console.log(req.body);
      // Validate 
      if (!email || !password || !first_name || !roleName) {
          return res.status(400).json({
              status: 'error',
              message: 'Email, password, first_name, and role are required.',
          });
      }

      try {

          const userRoleId = req.accountability?.role; 

          // Check if admin
          if (userRoleId !== ADMIN_ROLE_ID) {
              return res.status(403).json({
                  status: 'error',
                  message: 'Only admins can perform this action.',
              });
          }

          let roleId;
          if (roleName === 'admin') {
              roleId = ADMIN_ROLE_ID;
          } else if (roleName === 'verifikator') {
              roleId = VERIFIKATOR_ROLE_ID;
          } else {
              return res.status(400).json({
                  status: 'error',
                  message: `Invalid role: "${roleName}". Only "admin" and "verifikator" are allowed.`,
              });
          }

          // Check if first_name 
          const usersService = new ItemsService('directus_users', { schema: req.schema });
          const existingUser = await usersService.readByQuery({
              filter: { first_name },
              limit: 1,
          });

          if (existingUser && existingUser.length > 0) {
              return res.status(400).json({
                  status: 'error',
                  message: 'First name is already taken.',
              });
          }

          // Register user
          const newUser = await usersService.createOne({
              email,
              password, // hash password by directus
              first_name,
              role: roleId,
              status: 'active', 
          });

          res.status(201).json({
              status: 'success',
              data: newUser,
          });
      } catch (err) {
          res.status(500).json({
              status: 'error',
              message: err.message,
          });
      }
  });

  router.get('/list-users', async (req, res) => {
    const { search, limit = 10, offset = 0 } = req.query;

    try {
        const usersService = new ItemsService('directus_users', { schema: req.schema });

        //  role mapping
        const roleMapping = {
            'fa064cca-97c3-473c-b9bf-2fe2c196d22e': 'Administrator', 
            'f2acda8a-8eba-4a4f-a374-7f85e8d9e02b': 'Verifikator',  
        };

        // Build filters 
        const filters = { role: { _in: Object.keys(roleMapping) } }; // Filter  both 
        if (search) {
            filters.first_name = { _contains: search }; // 
        }

        // Fetch users with pagination
        const users = await usersService.readByQuery({
            filter: filters,
            fields: ['id', 'first_name', 'email', 'role', 'status'], 
            limit: parseInt(limit, 10),
            offset: parseInt(offset, 10),
            sort: ['first_name'], 
        });

        // Map roles
        const formattedUsers = users.map(user => ({
            ...user,
            role: roleMapping[user.role] || 'Unknown Role', // Map role ID
        }));

        res.status(200).json({
            status: 'success',
            data: formattedUsers,
            pagination: {
                limit: parseInt(limit, 10),
                offset: parseInt(offset, 10),
                total: formattedUsers.length,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
});



   // Update user
   router.patch('/update-user/:id', async (req, res) => {
    const { id } = req.params;
    const { email, first_name, password } = req.body;

    // Validate input
    if (!id) {
        return res.status(400).json({
            status: 'error',
            message: 'User ID is required.',
        });
    }

    if (!email && !first_name && !password) {
        return res.status(400).json({
            status: 'error',
            message: 'At least one field (email, first_name, password) is required to update.',
        });
    }

    try {
        const userRoleId = req.accountability?.role; 

        // Check if admin
        if (userRoleId !== ADMIN_ROLE_ID) {
            return res.status(403).json({
                status: 'error',
                message: 'Only admins can perform this action.',
            });
        }

        const usersService = new ItemsService('directus_users', { schema: req.schema });

        // Prepare update payload
        const updateData = {};
        if (email) updateData.email = email;
        if (first_name) updateData.first_name = first_name;
        if (password) updateData.password = password; // hash by directus

        const updatedUser = await usersService.updateOne(id, updateData);

        res.status(200).json({
            status: 'success',
            data: updatedUser,
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
});
};
