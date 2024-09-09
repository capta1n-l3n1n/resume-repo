import React from "react";
import { Avatar, Icon, Text } from "zmp-ui";
import { IEmployee } from "../@app/models/employee.model";
import { UserHelper } from "../@app/helpers/user.helper";

interface UserCardProps {
  info: IEmployee | undefined;
}

const UserCard: React.FunctionComponent<UserCardProps> = ({ info }) => {
  return (
    <div className="flex flex-col justify-center gap-2 align-middle">
      <div className="flex justify-start gap-4 align-middle">
        <Avatar story="default" online backgroundColor="PURPLE-BLUE">
          {UserHelper.extractAvatar(info) || "S"}
        </Avatar>
        <div>
          <Text.Title size="xLarge">{info?.name || "xyz"}</Text.Title>
          <Text>
            <Icon icon="zi-call-solid" size={14} />
            <span className="ml-1">{info?.phone || "..."}</span>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
