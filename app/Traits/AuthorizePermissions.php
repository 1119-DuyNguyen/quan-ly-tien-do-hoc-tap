<?php

namespace App\Traits;

use App\Models\Authorization\Quyen;


trait AuthorizePermissions
{
    protected $permissionList = null;

    public function nhomQuyen()
    {
        return $this->belongsToMany(Quyen::class);
    }


    public function hasRole($quyen)
    {
        if (is_string($quyen)) {
            return $this->nhomQuyen->contains('name', $quyen);
        }

        return false;
    }

    public function hasPermissions($permission = null)
    {
        if (is_null($permission)) {
            return $this->getPermissions()->count() > 0;
        }

        if (is_string($permission)) {
            return $this->getPermissions()->contains('name', $permission);
        }

        return false;
    }

    private function getPermissions()
    {
        $quyen = $this->nhomQuyen->first();
        if ($quyen) {
            if (!$quyen->relationLoaded('permissions')) {
                /** @var NhomQuyen nhomQuyen */
                $this->nhomQuyen->load('permissions');
                // tương đương with()
            }

            $this->permissionList = $this->nhomQuyen->pluck('nhomChucNang')->flatten();
        }

        return $this->permissionList ?? collect();
    }
}
