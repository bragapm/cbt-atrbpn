export default (router, { services }) => {
    const { ItemsService } = services;
  
    const ADMIN_ROLE_ID = 'fa064cca-97c3-473c-b9bf-2fe2c196d22e'; 
    const VERIFIKATOR_ROLE_ID = 'f2acda8a-8eba-4a4f-a374-7f85e8d9e02b'; 
  
    router.post('/', async (req, res) => {
      const { email, password, first_name, roleName } = req.body;
      console.log(req.body);
      // Validate 
      if (!email || !password || !first_name || !roleName) {
        return res.status(400).json({
          status: 'error',
          message: 'Email, password, username, and role are required.',
        });
      }
  
      try {
        // Get requesting user ID and role
        const userId = req.accountability?.user;
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
  
        // Check if already exists
        const usersService = new ItemsService('directus_users', { schema: req.schema });
        const existingUser = await usersService.readByQuery({
        filter: { first_name },
        limit: 1,
        });

        if (existingUser && existingUser.length > 0) {
        return res.status(400).json({
            status: 'error',
            message: 'name is already taken.',
        });
        }
  
        // Register user
        const newUser = await usersService.createOne({
            email,
            password, //  hash password by directus
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
  };
  